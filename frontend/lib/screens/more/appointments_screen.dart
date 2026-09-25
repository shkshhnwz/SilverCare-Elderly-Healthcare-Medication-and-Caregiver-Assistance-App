// lib/screens/more/appointments_screen.dart
// Appointments & Telehealth (PRD 6.7)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_input.dart';
import '../../widgets/app_toast.dart';
import '../../core/socket_service.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();
  List<dynamic> _appointments = [];
  bool _loading = true;
  bool _createLoading = false;

  final _titleCtrl = TextEditingController();
  final _doctorCtrl = TextEditingController();
  final _locationCtrl = TextEditingController();
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;

  @override
  void initState() {
    super.initState();
    _load();
    _socket.on('appointment_created', _onSocketUpdate);
    _socket.on('appointment_updated', _onSocketUpdate);
  }

  void _onSocketUpdate(dynamic _) {
    if (mounted) _load();
  }

  @override
  void dispose() {
    _socket.off('appointment_created');
    _socket.off('appointment_updated');
    _titleCtrl.dispose();
    _doctorCtrl.dispose();
    _locationCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final res = await _api.get('/api/appointments/patients/$patientId');
      if (mounted) setState(() { _appointments = res.data as List<dynamic>? ?? []; _loading = false; });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _createAppointment([StateSetter? setModalState]) async {
    if (_createLoading) return;
    if (_titleCtrl.text.trim().isEmpty || _doctorCtrl.text.trim().isEmpty) {
      context.showToast('Enter title and doctor name', type: ToastType.error);
      return;
    }
    if (_selectedDate == null) {
      context.showToast('Please select appointment date', type: ToastType.error);
      return;
    }
    if (_selectedTime == null) {
      context.showToast('Please select appointment time', type: ToastType.error);
      return;
    }

    final scheduled = DateTime(
      _selectedDate!.year,
      _selectedDate!.month,
      _selectedDate!.day,
      _selectedTime!.hour,
      _selectedTime!.minute,
    );

    setModalState?.call(() => _createLoading = true);
    setState(() => _createLoading = true);
    try {
      final auth = context.read<AuthProvider>();
      await _api.post('/api/appointments', data: {
        'patientId': auth.activePatientId,
        'title': _titleCtrl.text.trim(),
        'doctorName': _doctorCtrl.text.trim(),
        'clinicOrHospital': _locationCtrl.text.trim().isEmpty ? 'TBD' : _locationCtrl.text.trim(),
        'scheduledAt': scheduled.toIso8601String(),
        'type': 'Visit',
      });
      if (mounted) {
        context.showToast('Appointment created!', type: ToastType.success);
        _titleCtrl.clear();
        _doctorCtrl.clear();
        _locationCtrl.clear();
        _selectedDate = null;
        _selectedTime = null;
        Navigator.pop(context);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to create appointment', type: ToastType.error);
    } finally {
      if (mounted) {
        setModalState?.call(() => _createLoading = false);
        setState(() => _createLoading = false);
      }
    }
  }

  int _selectedTab = 0; // 0: Upcoming, 1: Completed

  Future<void> _completeAppointment(String aptId) async {
    try {
      await _api.patch('/api/appointments/$aptId/complete');
      if (mounted) {
        context.showToast('Appointment marked as completed! 🎉', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) {
        context.showToast('Failed to complete appointment', type: ToastType.error);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredAppointments = _appointments.where((apt) {
      final isCompleted = apt['status'] == 'COMPLETED';
      return _selectedTab == 0 ? !isCompleted : isCompleted;
    }).toList();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments'),
        backgroundColor: AppColors.background,
        actions: [
          if (context.watch<AuthProvider>().canWrite)
            IconButton(
              icon: const Icon(Icons.add, color: AppColors.primary),
              onPressed: () => _showCreateModal(context),
            ),
        ],
      ),
      body: Column(
        children: [
          // Filter Tabs
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: 8),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppColors.surfaceBorder),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _selectedTab = 0),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _selectedTab == 0 ? AppColors.primary : Colors.transparent,
                          borderRadius: BorderRadius.circular(9),
                        ),
                        child: Center(
                          child: Text(
                            'Upcoming (${_appointments.where((a) => a['status'] != 'COMPLETED').length})',
                            style: TextStyle(
                              color: _selectedTab == 0 ? Colors.white : AppColors.textMuted,
                              fontWeight: _selectedTab == 0 ? FontWeight.bold : FontWeight.normal,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => setState(() => _selectedTab = 1),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _selectedTab == 1 ? AppColors.primary : Colors.transparent,
                          borderRadius: BorderRadius.circular(9),
                        ),
                        child: Center(
                          child: Text(
                            'Completed (${_appointments.where((a) => a['status'] == 'COMPLETED').length})',
                            style: TextStyle(
                              color: _selectedTab == 1 ? Colors.white : AppColors.textMuted,
                              fontWeight: _selectedTab == 1 ? FontWeight.bold : FontWeight.normal,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                : RefreshIndicator(
                    onRefresh: _load,
                    color: AppColors.primary,
                    child: filteredAppointments.isEmpty
                        ? ListView(children: [
                            const SizedBox(height: 60),
                            Center(child: Column(children: [
                              Text(_selectedTab == 0 ? '📅' : '✅', style: const TextStyle(fontSize: 48)),
                              const SizedBox(height: 12),
                              Text(
                                _selectedTab == 0 ? 'No Upcoming Appointments' : 'No Completed Visits',
                                style: AppTypography.bodyBold(size: AppTypography.lg),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                _selectedTab == 0
                                    ? 'Schedule your next visit above'
                                    : 'Completed visits will be archived here',
                                style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted),
                              ),
                            ])),
                          ])
                        : ListView.builder(
                            padding: const EdgeInsets.all(AppSpacing.base),
                            itemCount: filteredAppointments.length,
                            itemBuilder: (_, i) {
                              final apt = filteredAppointments[i];
                              final date = DateTime.tryParse(apt['scheduledAt'] ?? '');
                              final isCompleted = apt['status'] == 'COMPLETED';

                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: AppCard(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Container(
                                            width: 48,
                                            height: 48,
                                            decoration: BoxDecoration(
                                              color: isCompleted ? AppColors.successFaint : AppColors.primaryFaint,
                                              borderRadius: BorderRadius.circular(12),
                                            ),
                                            child: Column(
                                              mainAxisAlignment: MainAxisAlignment.center,
                                              children: [
                                                Text(
                                                  '${date?.day ?? ''}',
                                                  style: AppTypography.bodyBold(
                                                    size: AppTypography.md,
                                                    color: isCompleted ? AppColors.success : AppColors.primary,
                                                  ),
                                                ),
                                                Text(
                                                  _monthShort(date),
                                                  style: TextStyle(
                                                    fontSize: 10,
                                                    color: isCompleted ? AppColors.success : AppColors.primary,
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                          const SizedBox(width: 12),
                                          Expanded(
                                            child: Column(
                                              crossAxisAlignment: CrossAxisAlignment.start,
                                              children: [
                                                Text(
                                                  apt['title'] ?? 'Appointment',
                                                  style: AppTypography.bodySemiBold(size: AppTypography.md),
                                                ),
                                                if (apt['doctorName'] != null && apt['doctorName'].toString().isNotEmpty) ...[
                                                  const SizedBox(height: 2),
                                                  Text(
                                                    'Dr. ${apt['doctorName']}',
                                                    style: AppTypography.body(size: AppTypography.xs, color: AppColors.primary),
                                                  ),
                                                ],
                                                const SizedBox(height: 2),
                                                Text(
                                                  '📍 ${apt['clinicOrHospital'] ?? apt['location'] ?? 'Location TBD'}',
                                                  style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                                                ),
                                              ],
                                            ),
                                          ),
                                          Column(
                                            crossAxisAlignment: CrossAxisAlignment.end,
                                            children: [
                                              AppBadge(
                                                label: isCompleted ? 'Completed' : (apt['type'] ?? 'Visit'),
                                                variant: isCompleted ? BadgeVariant.success : BadgeVariant.primary,
                                              ),
                                              if (date != null) ...[
                                                const SizedBox(height: 4),
                                                Text(
                                                  '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}',
                                                  style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                                                ),
                                              ],
                                            ],
                                          ),
                                        ],
                                      ),
                                      if (!isCompleted && context.watch<AuthProvider>().canWrite) ...[
                                        const SizedBox(height: 12),
                                        const Divider(height: 1, color: AppColors.surfaceBorder),
                                        const SizedBox(height: 10),
                                        SizedBox(
                                          width: double.infinity,
                                          child: OutlinedButton.icon(
                                            onPressed: () => _completeAppointment(apt['id'].toString()),
                                            icon: const Icon(Icons.check_circle_outline, size: 18, color: AppColors.success),
                                            label: const Text('Mark Visit Completed', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.bold, fontSize: 13)),
                                            style: OutlinedButton.styleFrom(
                                              side: const BorderSide(color: AppColors.success),
                                              backgroundColor: AppColors.successFaint,
                                              padding: const EdgeInsets.symmetric(vertical: 10),
                                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
          ),
        ],
      ),
    );
  }

  String _monthShort(DateTime? d) {
    if (d == null) return '';
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[d.month - 1];
  }

  void _showCreateModal(BuildContext context) {
    _selectedDate = DateTime.now().add(const Duration(days: 1));
    _selectedTime = const TimeOfDay(hour: 10, minute: 0);

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24),
          child: SingleChildScrollView(
            child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
              Center(
                child: Text('New Appointment', style: AppTypography.bodyBold(size: AppTypography.lg)),
              ),
              const SizedBox(height: 16),
              AppInput(label: 'Title *', placeholder: 'e.g., Cardiology Checkup', controller: _titleCtrl, icon: Icons.calendar_today),
              AppInput(label: 'Doctor Name *', placeholder: 'e.g., Dr. Smith', controller: _doctorCtrl, icon: Icons.person_outline),
              AppInput(label: 'Location / Hospital', placeholder: 'e.g., City Hospital', controller: _locationCtrl, icon: Icons.location_on_outlined),
              
              const Text('Appointment Date & Time *', style: TextStyle(color: AppColors.textSecondary, fontSize: 13, fontWeight: FontWeight.w600)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: AppColors.surfaceBorder),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        backgroundColor: AppColors.surfaceElevated,
                      ),
                      icon: const Icon(Icons.calendar_month, size: 18, color: AppColors.primary),
                      label: Text(
                        _selectedDate != null
                            ? '${_selectedDate!.day} ${_monthShort(_selectedDate)} ${_selectedDate!.year}'
                            : 'Pick Date',
                        style: const TextStyle(fontSize: 13),
                      ),
                      onPressed: () async {
                        final picked = await showDatePicker(
                          context: ctx,
                          initialDate: _selectedDate ?? DateTime.now().add(const Duration(days: 1)),
                          firstDate: DateTime.now(),
                          lastDate: DateTime.now().add(const Duration(days: 365)),
                        );
                        if (picked != null) {
                          setModalState(() => _selectedDate = picked);
                          setState(() => _selectedDate = picked);
                        }
                      },
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: AppColors.surfaceBorder),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        backgroundColor: AppColors.surfaceElevated,
                      ),
                      icon: const Icon(Icons.access_time, size: 18, color: AppColors.primary),
                      label: Text(
                        _selectedTime != null ? _selectedTime!.format(ctx) : 'Pick Time',
                        style: const TextStyle(fontSize: 13),
                      ),
                      onPressed: () async {
                        final picked = await showTimePicker(
                          context: ctx,
                          initialTime: _selectedTime ?? const TimeOfDay(hour: 10, minute: 0),
                        );
                        if (picked != null) {
                          setModalState(() => _selectedTime = picked);
                          setState(() => _selectedTime = picked);
                        }
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              AppButton(
                label: 'Schedule Appointment',
                onPressed: () => _createAppointment(setModalState),
                loading: _createLoading,
                disabled: _createLoading,
                fullWidth: true,
              ),
            ]),
          ),
        ),
      ),
    );
  }
}
