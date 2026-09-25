// lib/screens/more/reports_screen.dart
// Reporting & Insights (PRD 6.9)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_toast.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});
  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _reports = [];
  bool _loading = true;
  bool _generating = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _load();
    });
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) {
      if (mounted) setState(() => _loading = false);
      return;
    }
    try {
      final res = await _api.get('/api/reports/patients/$patientId');
      if (mounted) {
        setState(() {
          _reports = res.data is List ? res.data as List : [];
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _generateReport(String type) async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) {
      context.showToast('Please select a patient first', type: ToastType.error);
      return;
    }

    setState(() => _generating = true);
    try {
      final res = await _api.post('/api/reports/generate', data: {
        'patientId': patientId,
        'reportType': type,
        'days': 30,
      });
      if (mounted) {
        context.showToast('Report generated successfully!', type: ToastType.success);
        await _load();
        if (res.data != null && res.data['report'] != null) {
          _showReportDetail(Map<String, dynamic>.from(res.data['report'] as Map));
        }
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to generate report', type: ToastType.error);
    } finally {
      if (mounted) setState(() => _generating = false);
    }
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    final d = DateTime.tryParse(dateStr)?.toLocal();
    if (d == null) return '';
    final now = DateTime.now();
    final isToday = d.year == now.year && d.month == now.month && d.day == now.day;
    final timeStr = '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
    if (isToday) return 'Today at $timeStr';
    return '${d.month}/${d.day}/${d.year} at $timeStr';
  }

  void _showReportDetail(Map<String, dynamic> report) {
    final data = report['data'] is Map ? Map<String, dynamic>.from(report['data'] as Map) : null;
    final type = (report['type'] ?? 'FULL').toString().toUpperCase();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => DraggableScrollableSheet(
        initialChildSize: 0.85,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (ctx, scrollController) => Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base),
          child: ListView(
            controller: scrollController,
            children: [
              const SizedBox(height: 12),
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: AppColors.surfaceBorder,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      report['title'] ?? 'Health Report',
                      style: AppTypography.bodyBold(size: AppTypography.lg),
                    ),
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(ctx),
                    icon: const Icon(Icons.close, color: AppColors.textSecondary),
                  ),
                ],
              ),
              Text(
                'Generated ${_formatDate(report['createdAt'])}',
                style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
              ),
              const SizedBox(height: 16),

              if (data != null) ...[
                // 1. Weekly Digest specific
                if (data['summaryParagraph'] != null) ...[
                  AppCard(
                    glowColor: AppColors.primary,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Weekly Summary', style: AppTypography.bodyBold(size: AppTypography.sm, color: AppColors.primary)),
                        const SizedBox(height: 6),
                        Text(data['summaryParagraph'], style: AppTypography.body(size: AppTypography.sm)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                if (data['metrics'] is Map) ...[
                  Text('7-Day Metrics', style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [
                      _metricBox('Adherence', '${data['metrics']['medicationAdherenceScore'] ?? 0}%', AppColors.success),
                      _metricBox('Doses Taken', '${data['metrics']['totalDosesTaken'] ?? 0}', AppColors.primary),
                      _metricBox('Vitals Logged', '${data['metrics']['vitalsReadingsLogged'] ?? 0}', AppColors.info),
                      _metricBox('Tasks Done', '${data['metrics']['tasksCompleted'] ?? 0}', AppColors.warning),
                    ],
                  ),
                  const SizedBox(height: 16),
                ],

                // 2. Medication Adherence
                if (data['medicationAdherence'] is Map) ...[
                  Text('Medication Adherence', style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 8),
                  AppCard(
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Overall Rate', style: AppTypography.body(size: AppTypography.sm)),
                            AppBadge(
                              label: '${data['medicationAdherence']['adherencePercentage'] ?? 0}%',
                              variant: (data['medicationAdherence']['adherencePercentage'] ?? 0) >= 80 ? BadgeVariant.success : BadgeVariant.warning,
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Confirmed Doses', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            Text(
                              '${data['medicationAdherence']['dosesTaken'] ?? 0} / ${data['medicationAdherence']['totalDosesScheduled'] ?? 0}',
                              style: AppTypography.bodyBold(size: AppTypography.xs),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                // 3. Vitals Overview
                if (data['vitalsSummary'] is Map) ...[
                  Text('Vitals Overview', style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 8),
                  AppCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _vitalRow('Average BP', data['vitalsSummary']['averageBloodPressure'] ?? 'N/A'),
                        const Divider(color: AppColors.surfaceBorder),
                        _vitalRow('Average Glucose', data['vitalsSummary']['averageGlucose'] ?? 'N/A'),
                        const Divider(color: AppColors.surfaceBorder),
                        _vitalRow('Latest Weight', data['vitalsSummary']['latestWeight'] ?? 'N/A'),
                        const Divider(color: AppColors.surfaceBorder),
                        _vitalRow('Total Readings', '${data['vitalsSummary']['totalVitalsRecorded'] ?? 0}'),
                        if ((data['vitalsSummary']['totalAnomaliesTriggered'] ?? 0) > 0) ...[
                          const Divider(color: AppColors.surfaceBorder),
                          _vitalRow('Anomalies / Alerts', '${data['vitalsSummary']['totalAnomaliesTriggered']}', isAlert: true),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                // 4. Care Directives
                if (data['careDirectives'] is Map) ...[
                  Text('Care Directives', style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 8),
                  AppCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Dietary: ${data['careDirectives']['dietaryNotes'] ?? 'None'}', style: AppTypography.body(size: AppTypography.xs)),
                        const SizedBox(height: 6),
                        Text('Mobility: ${data['careDirectives']['mobilityInstructions'] ?? 'None'}', style: AppTypography.body(size: AppTypography.xs)),
                        const SizedBox(height: 6),
                        Text('Resuscitation: ${data['careDirectives']['resuscitationStatus'] ?? 'Full Code'}', style: AppTypography.body(size: AppTypography.xs, color: AppColors.danger)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                ],

                // 5. Clinical Incidents
                if (data['clinicalIncidents'] is List && (data['clinicalIncidents'] as List).isNotEmpty) ...[
                  Text('Recent Alerts & Incidents (${(data['clinicalIncidents'] as List).length})', style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 8),
                  ...(data['clinicalIncidents'] as List).take(5).map((inc) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: AppCard(
                      glowColor: AppColors.danger,
                      child: Row(
                        children: [
                          const Text('🚨', style: TextStyle(fontSize: 18)),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(inc['type'] ?? 'ALERT', style: AppTypography.bodyBold(size: AppTypography.xs)),
                                Text(inc['message'] ?? '', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  )),
                  const SizedBox(height: 14),
                ],
              ] else ...[
                AppCard(
                  child: Text(
                    report['description'] ?? 'Clinical summary record generated for patient.',
                    style: AppTypography.body(size: AppTypography.sm),
                  ),
                ),
                const SizedBox(height: 14),
              ],

              AppButton(
                label: 'Close',
                variant: AppButtonVariant.secondary,
                onPressed: () => Navigator.pop(ctx),
                fullWidth: true,
              ),
              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }

  Widget _metricBox(String label, String value, Color color) {
    return Container(
      width: (MediaQuery.of(context).size.width - AppSpacing.base * 2 - 10) / 2 - 1,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
          const SizedBox(height: 4),
          Text(value, style: AppTypography.bodyBold(size: AppTypography.lg, color: color)),
        ],
      ),
    );
  }

  Widget _vitalRow(String label, String value, {bool isAlert = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: AppTypography.body(size: AppTypography.xs, color: AppColors.textSecondary)),
        Text(
          value,
          style: AppTypography.bodyBold(
            size: AppTypography.xs,
            color: isAlert ? AppColors.danger : AppColors.textPrimary,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Reports & Insights'),
        backgroundColor: AppColors.background,
        elevation: 0,
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : RefreshIndicator(
              onRefresh: _load,
              color: AppColors.primary,
              backgroundColor: AppColors.surface,
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.base),
                children: [
                  // Generate buttons
                  Text('Generate Instant Report', style: AppTypography.bodyBold(size: AppTypography.md)),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: AppCard(
                          onTap: _generating ? null : () => _generateReport('FULL'),
                          child: Column(
                            children: [
                              const Icon(Icons.description, size: 28, color: AppColors.info),
                              const SizedBox(height: 6),
                              Text('Clinical', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                              Text('Full summary', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: AppCard(
                          onTap: _generating ? null : () => _generateReport('WEEKLY'),
                          child: Column(
                            children: [
                              const Icon(Icons.calendar_view_week, size: 28, color: AppColors.primary),
                              const SizedBox(height: 6),
                              Text('Weekly', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                              Text('Caregiver digest', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Expanded(
                        child: AppCard(
                          onTap: _generating ? null : () => _generateReport('ADHERENCE'),
                          child: Column(
                            children: [
                              const Icon(Icons.medical_services, size: 28, color: AppColors.success),
                              const SizedBox(height: 6),
                              Text('Adherence', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                              Text('Medications', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: AppCard(
                          onTap: _generating ? null : () => _generateReport('VITALS'),
                          child: Column(
                            children: [
                              const Icon(Icons.favorite, size: 28, color: AppColors.danger),
                              const SizedBox(height: 6),
                              Text('Vitals', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                              Text('Health trends', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),

                  if (_generating)
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 20),
                      child: Center(
                        child: Column(
                          children: [
                            CircularProgressIndicator(color: AppColors.primary),
                            SizedBox(height: 8),
                            Text('Analyzing health data & compiling report...'),
                          ],
                        ),
                      ),
                    ),

                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Available Reports', style: AppTypography.bodyBold(size: AppTypography.md)),
                      IconButton(
                        onPressed: _load,
                        icon: const Icon(Icons.refresh, size: 20, color: AppColors.textMuted),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  if (_reports.isEmpty)
                    AppCard(
                      padding: const EdgeInsets.symmetric(vertical: 28),
                      child: Center(
                        child: Column(
                          children: [
                            const Text('📊', style: TextStyle(fontSize: 32)),
                            const SizedBox(height: 8),
                            Text('No reports generated yet', style: AppTypography.body(color: AppColors.textMuted)),
                            const SizedBox(height: 4),
                            Text('Tap any button above to generate a report', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                          ],
                        ),
                      ),
                    )
                  else
                    ..._reports.map((report) {
                      final repMap = report is Map ? Map<String, dynamic>.from(report) : <String, dynamic>{};
                      final type = (repMap['type'] ?? 'Report').toString();
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: AppCard(
                          onTap: () => _showReportDetail(repMap),
                          child: Row(
                            children: [
                              Container(
                                width: 40,
                                height: 40,
                                decoration: BoxDecoration(
                                  color: AppColors.primaryFaint,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: const Icon(Icons.insert_drive_file, color: AppColors.primary, size: 22),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(repMap['title'] ?? 'Health Report', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                                    const SizedBox(height: 2),
                                    Text(
                                      _formatDate(repMap['createdAt']),
                                      style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                                    ),
                                  ],
                                ),
                              ),
                              AppBadge(
                                label: type,
                                variant: type == 'WEEKLY'
                                    ? BadgeVariant.primary
                                    : (type == 'ADHERENCE' ? BadgeVariant.success : BadgeVariant.info),
                              ),
                              const SizedBox(width: 6),
                              const Icon(Icons.chevron_right, size: 20, color: AppColors.textMuted),
                            ],
                          ),
                        ),
                      );
                    }),
                  const SizedBox(height: 30),
                ],
              ),
            ),
    );
  }
}
