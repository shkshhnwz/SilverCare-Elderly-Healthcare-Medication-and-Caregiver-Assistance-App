// lib/screens/tabs/dashboard_screen.dart
// Main dashboard — adherence ring, vitals summary, active alerts, upcoming appointments
// Ported from React Native dashboard.tsx

import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../core/socket_service.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_toast.dart';
import 'medications_screen.dart';
import 'vitals_screen.dart';
import 'emergency_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();

  int _adherence = 0;
  List<String> _alerts = [];
  List<dynamic> _appointments = [];
  List<dynamic> _tasks = [];

  @override
  void initState() {
    super.initState();
    _loadData();
    _setupSocket();
  }

  @override
  void dispose() {
    _socket.off('vital_alert');
    _socket.off('emergency_triggered');
    _socket.off('medication_missed');
    _socket.off('care_task_updated');
    super.dispose();
  }

  void _setupSocket() {
    _socket.on('vital_alert', (data) {
      if (!mounted) return;
      setState(() {
        _alerts.insert(0, data['message'] ?? 'Vitals alert triggered');
        if (_alerts.length > 5) _alerts = _alerts.sublist(0, 5);
      });
    });
    _socket.on('emergency_triggered', (data) {
      if (!mounted) return;
      final patientName = (data is Map && data['patientName'] != null)
          ? data['patientName']
          : 'Care recipient';
      setState(() {
        _alerts.insert(0, '🚨 Emergency SOS triggered by $patientName!');
        if (_alerts.length > 5) _alerts = _alerts.sublist(0, 5);
      });
      context.showToast('🚨 SOS ALERT: $patientName triggered an emergency!', type: ToastType.error);
    });
    _socket.on('medication_missed', (data) {
      if (!mounted) return;
      setState(() {
        _alerts.insert(0, 'Missed dose: ${data['medicationName'] ?? 'Unknown'}');
        if (_alerts.length > 5) _alerts = _alerts.sublist(0, 5);
      });
    });
    _socket.on('care_task_updated', (_) {
      if (!mounted) return;
      _loadData();
    });
  }

  Future<void> _loadData() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;

    try {
      final results = await Future.wait([
        _api.get('/api/medications/patients/$patientId').catchError((_) => null as dynamic),
        _api.get('/api/medications/patients/$patientId/adherence-analytics').catchError((_) => null as dynamic),
        _api.get('/api/appointments/patients/$patientId?filter=upcoming').catchError((_) => null as dynamic),
        _api.get('/api/care-plans/patients/$patientId/tasks').catchError((_) => null as dynamic),
      ]);
      final adhRes = results[1];
      final appRes = results[2];
      final tasksRes = results[3];

      if (mounted) {
        setState(() {
          final summary = adhRes?.data?['summary'];
          _adherence = (summary?['adherencePercent'] ?? 0).round();
          _appointments = (appRes?.data as List<dynamic>? ?? []).take(3).toList();
          final rawTasks = tasksRes?.data is List ? List<dynamic>.from(tasksRes.data as List) : [];
          // Sort: pending tasks first, completed tasks after
          rawTasks.sort((a, b) {
            final aCompleted = a is Map && a['status'] == 'COMPLETED';
            final bCompleted = b is Map && b['status'] == 'COMPLETED';
            if (aCompleted != bCompleted) {
              return aCompleted ? 1 : -1;
            }
            return 0;
          });
          _tasks = rawTasks.take(6).toList();
        });
      }
    } catch (_) {}
  }

  Future<void> _toggleTask(Map<String, dynamic> task) async {
    final taskId = task['id'];
    if (taskId == null) return;
    try {
      await _api.patch('/api/care-plans/tasks/$taskId/toggle').catchError((_) {
        return _api.patch('/api/care-plans/tasks/$taskId/complete');
      });
      final wasCompleted = task['status'] == 'COMPLETED';
      if (mounted) {
        context.showToast(
          wasCompleted ? 'Task marked pending' : 'Task marked completed! ✓',
          type: ToastType.success,
        );
        _loadData();
      }
    } catch (_) {
      if (mounted) context.showToast('Failed to update task', type: ToastType.error);
    }
  }

  String _formatDue(dynamic due) {
    if (due == null) return '';
    final d = DateTime.tryParse(due.toString())?.toLocal();
    if (d == null) return due.toString();
    final now = DateTime.now();
    final isToday = d.year == now.year && d.month == now.month && d.day == now.day;
    final timeStr = '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
    if (isToday) return 'Today at $timeStr';
    return '${d.month}/${d.day} at $timeStr';
  }

  Future<void> _onRefresh() async {
    await _loadData();
  }

  String _getTimeOfDay() {
    final h = DateTime.now().hour;
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  void _showPatientSwitcher(BuildContext context, AuthProvider auth) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      builder: (ctx) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text('Select Patient', style: AppTypography.bodyBold(size: AppTypography.lg)),
            ),
            ...auth.availableCircles.map((circle) {
              final memberships = circle['memberships'] as List?;
              final myMem = memberships?.firstWhere((m) => m['userId'] == auth.user?.id, orElse: () => null);
              final role = myMem?['role']?['name'] ?? 'MEMBER';
              return ListTile(
                title: Text(circle['name'] ?? 'Care Circle'),
                subtitle: Text('Role: $role'),
                trailing: auth.activePatientId == circle['patientId'] 
                    ? const Icon(Icons.check, color: AppColors.primary) 
                    : null,
                onTap: () {
                  auth.switchPatient(circle['patientId'], role);
                  Navigator.pop(ctx);
                  _loadData();
                },
              );
            }),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.user;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('SilverCare'),
            if (user != null)
              Text(
                'Welcome, ${user.firstName}',
                style: AppTypography.body(size: AppTypography.xs, color: AppColors.textSecondary),
              ),
          ],
        ),
        actions: [
          if (auth.availableCircles.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.swap_horiz, color: AppColors.primary),
              onPressed: () => _showPatientSwitcher(context, auth),
            ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _onRefresh,
          color: AppColors.primary,
          backgroundColor: AppColors.surface,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // ── Top Bar ───────────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: AppSpacing.base),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Good ${_getTimeOfDay()},',
                              style: AppTypography.body(
                                  size: AppTypography.sm,
                                  color: AppColors.textMuted)),
                          Text('${user?.firstName ?? ''} ${user?.lastName ?? ''}',
                              style: AppTypography.bodyBold(size: AppTypography.xl)),
                        ],
                      ),
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: AppColors.primaryFaint,
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.primary, width: 2),
                        ),
                        child: Center(
                          child: Text(user?.initials ?? '',
                              style: AppTypography.bodyBold(
                                  size: AppTypography.sm, color: AppColors.primary)),
                        ),
                      ),
                    ],
                  ),
                ),

                // ── Alert Banner ──────────────────────────────────────
                if (_alerts.isNotEmpty) _buildAlertBanner(),

                // ── SOS Quick Access ──────────────────────────────────
                _buildSOSBar(context),

                // ── Adherence Ring ────────────────────────────────────
                _buildAdherenceCard(context),

                // ── Quick Links ───────────────────────────────────────
                Text('Quick Access',
                    style: AppTypography.bodyBold(size: AppTypography.md)),
                const SizedBox(height: 12),
                _buildQuickLinks(context),
                const SizedBox(height: 24),

                // ── Today's Tasks ─────────────────────────────────────
                _buildTasksSection(context),
                const SizedBox(height: 24),

                // ── Upcoming Appointments ─────────────────────────────
                _buildAppointmentsSection(context),

                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildAlertBanner() {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.warningFaint,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.warning.withValues(alpha: 0.4)),
      ),
      child: Row(
        children: [
          const Icon(Icons.warning, size: 16, color: AppColors.warning),
          const SizedBox(width: 8),
          Expanded(
            child: Text(_alerts.first,
                style: AppTypography.body(
                    size: AppTypography.sm, color: AppColors.warning)),
          ),
          if (_alerts.length > 1)
            AppBadge(label: '+${_alerts.length - 1}', variant: BadgeVariant.warning),
        ],
      ),
    );
  }

  Widget _buildSOSBar(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (_) => const EmergencyScreen()));
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.sos,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          children: [
            const Icon(Icons.error, size: 22, color: Colors.white),
            const SizedBox(width: 10),
            Expanded(
              child: Text('Emergency SOS',
                  style: AppTypography.bodyBold(
                      size: AppTypography.md, color: Colors.white)),
            ),
            Icon(Icons.chevron_right,
                size: 18, color: Colors.white.withValues(alpha: 0.7)),
          ],
        ),
      ),
    );
  }

  Widget _buildAdherenceCard(BuildContext context) {
    final color = _adherence >= 80
        ? AppColors.success
        : _adherence >= 60
            ? AppColors.warning
            : AppColors.danger;

    return AppCard(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          CircularPercentIndicator(
            radius: 70,
            lineWidth: 14,
            percent: min(_adherence / 100, 1.0),
            center: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('$_adherence%',
                    style: AppTypography.heading(size: AppTypography.xxl, color: color)
                        .copyWith(fontWeight: FontWeight.w800)),
                Text('Adherence',
                    style: AppTypography.body(
                        size: AppTypography.xs, color: AppColors.textMuted)),
              ],
            ),
            progressColor: color,
            backgroundColor: AppColors.surfaceElevated,
            circularStrokeCap: CircularStrokeCap.round,
            animation: true,
            animationDuration: 800,
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Medication Adherence',
                    style: AppTypography.bodyBold(size: AppTypography.md)),
                const SizedBox(height: 2),
                Text('Last 7 days',
                    style: AppTypography.body(
                        size: AppTypography.xs, color: AppColors.textMuted)),
                const SizedBox(height: 10),
                _statDot(AppColors.success, 'Taken on time'),
                const SizedBox(height: 4),
                _statDot(AppColors.warning, 'Late or skipped'),
                const SizedBox(height: 4),
                _statDot(AppColors.danger, 'Missed'),
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: () async {
                    await Navigator.push(context, MaterialPageRoute(builder: (_) => const MedicationsScreen()));
                    _loadData();
                  },
                  child: Text('View details →',
                      style: AppTypography.bodySemiBold(
                          size: AppTypography.xs, color: AppColors.primary)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _statDot(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 6),
        Text(label,
            style: AppTypography.body(
                size: AppTypography.xs, color: AppColors.textSecondary)),
      ],
    );
  }

  Widget _buildQuickLinks(BuildContext context) {
    final links = [
      _QuickLink(Icons.medical_services, 'Medications', AppColors.primary, () async { await Navigator.push(context, MaterialPageRoute(builder: (_) => const MedicationsScreen())); _loadData(); }),
      _QuickLink(Icons.favorite, 'Vitals', AppColors.danger, () async { await Navigator.push(context, MaterialPageRoute(builder: (_) => const VitalsScreen())); _loadData(); }),
      _QuickLink(Icons.location_on, 'Location', AppColors.accent, () async { await Navigator.pushNamed(context, '/location'); _loadData(); }),
      _QuickLink(Icons.people, 'Care Circle', AppColors.success, () async { await Navigator.pushNamed(context, '/care-circle'); _loadData(); }),
    ];

    final width = (MediaQuery.of(context).size.width - 48 - 10) / 2;

    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: links.map((link) {
        return GestureDetector(
          onTap: link.onTap,
          child: Container(
            width: width,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: link.color.withValues(alpha: 0.25)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: link.color.withValues(alpha: 0.13),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(link.icon, size: 24, color: link.color),
                ),
                const SizedBox(height: 8),
                Text(link.label,
                    style: AppTypography.bodySemiBold(size: AppTypography.sm)),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildTasksSection(BuildContext context) {
    final completedCount = _tasks.where((t) => t is Map && t['status'] == 'COMPLETED').length;

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Text("Today's Tasks", style: AppTypography.bodyBold(size: AppTypography.md)),
                if (_tasks.isNotEmpty) ...[
                  const SizedBox(width: 8),
                  AppBadge(
                    label: '$completedCount/${_tasks.length} done',
                    variant: completedCount == _tasks.length ? BadgeVariant.success : BadgeVariant.muted,
                  ),
                ],
              ],
            ),
            GestureDetector(
              onTap: () async {
                await Navigator.pushNamed(context, '/care-plan');
                _loadData();
              },
              child: Text('See all', style: AppTypography.body(size: AppTypography.sm, color: AppColors.primary)),
            ),
          ],
        ),
        const SizedBox(height: 10),
        if (_tasks.isEmpty)
          AppCard(
            padding: const EdgeInsets.symmetric(vertical: 24),
            child: Center(
              child: Text('✅ No tasks scheduled for today!', style: AppTypography.body(color: AppColors.textMuted)),
            ),
          )
        else
          ..._tasks.map((task) {
            final taskMap = task is Map ? Map<String, dynamic>.from(task) : <String, dynamic>{};
            final isCompleted = taskMap['status'] == 'COMPLETED';

            return Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: AppCard(
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () => _toggleTask(taskMap),
                      child: Container(
                        width: 28,
                        height: 28,
                        decoration: BoxDecoration(
                          color: isCompleted ? AppColors.successFaint : AppColors.surfaceElevated,
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(
                            color: isCompleted ? AppColors.success : AppColors.surfaceBorder,
                            width: isCompleted ? 1.5 : 1,
                          ),
                        ),
                        child: isCompleted
                            ? const Icon(Icons.check, size: 18, color: AppColors.success)
                            : null,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: GestureDetector(
                        onTap: () => _toggleTask(taskMap),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              taskMap['title'] ?? '',
                              style: AppTypography.bodySemiBold().copyWith(
                                decoration: isCompleted ? TextDecoration.lineThrough : null,
                                color: isCompleted ? AppColors.textMuted : AppColors.textPrimary,
                              ),
                            ),
                            if (taskMap['dueAt'] != null || taskMap['dueWindowEnd'] != null)
                              Text(
                                'Due: ${_formatDue(taskMap['dueAt'] ?? taskMap['dueWindowEnd'])}',
                                style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                              ),
                          ],
                        ),
                      ),
                    ),
                    AppBadge(
                      label: isCompleted ? 'Completed' : (taskMap['priority'] ?? 'Pending'),
                      variant: isCompleted ? BadgeVariant.success : BadgeVariant.warning,
                    ),
                  ],
                ),
              ),
            );
          }),
      ],
    );
  }

  Widget _buildAppointmentsSection(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Upcoming Appointments',
                style: AppTypography.bodyBold(size: AppTypography.md)),
            GestureDetector(
              onTap: () async {
                 await Navigator.pushNamed(context, '/appointments');
                 _loadData();
              },
              child: Text('See all',
                  style: AppTypography.body(
                      size: AppTypography.sm, color: AppColors.primary)),
            ),
          ],
        ),
        const SizedBox(height: 10),
        if (_appointments.isEmpty)
          AppCard(
            padding: const EdgeInsets.symmetric(vertical: 24),
            child: Center(
              child: Text('📅 No upcoming appointments',
                  style: AppTypography.body(color: AppColors.textMuted)),
            ),
          )
        else
          ..._appointments.map((apt) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: AppCard(
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: AppColors.primaryFaint,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              DateTime.tryParse(apt['scheduledAt'] ?? '')?.day.toString() ?? '',
                              style: AppTypography.bodyBold(
                                  size: AppTypography.md, color: AppColors.primary),
                            ),
                            Text(
                              _monthShort(apt['scheduledAt']),
                              style: TextStyle(
                                  fontSize: 10, color: AppColors.primary),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(apt['title'] ?? 'Appointment',
                                style: AppTypography.bodySemiBold()),
                            const SizedBox(height: 2),
                            Text(apt['location'] ?? 'Location TBD',
                                style: AppTypography.body(
                                    size: AppTypography.xs,
                                    color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                      AppBadge(
                          label: apt['type'] ?? 'Visit',
                          variant: BadgeVariant.primary),
                    ],
                  ),
                ),
              )),
      ],
    );
  }

  String _monthShort(String? dateStr) {
    if (dateStr == null) return '';
    final d = DateTime.tryParse(dateStr);
    if (d == null) return '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.month - 1].toUpperCase();
  }
}

class _QuickLink {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  _QuickLink(this.icon, this.label, this.color, this.onTap);
}
