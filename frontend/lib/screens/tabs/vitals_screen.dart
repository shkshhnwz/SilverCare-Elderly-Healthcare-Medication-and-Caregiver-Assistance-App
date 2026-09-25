// lib/screens/tabs/vitals_screen.dart
// Vitals Tracking — manual entry, thresholds, trend display (PRD 6.3)
// Ported from vitals.tsx

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

class _VitalConfig {
  final String type;
  final String label;
  final String unit;
  final String icon;
  final Color color;
  _VitalConfig(this.type, this.label, this.unit, this.icon, this.color);
}

final _vitalConfigs = [
  _VitalConfig('BLOOD_PRESSURE', 'Blood Pressure', 'mmHg', '🫀', AppColors.danger),
  _VitalConfig('GLUCOSE', 'Blood Glucose', 'mg/dL', '🩸', AppColors.warning),
  _VitalConfig('HEART_RATE', 'Heart Rate', 'bpm', '💓', AppColors.danger),
  _VitalConfig('OXYGEN_SATURATION', 'SpO₂', '%', '🫁', AppColors.info),
  _VitalConfig('TEMPERATURE', 'Temperature', '°C', '🌡️', AppColors.warning),
  _VitalConfig('WEIGHT', 'Weight', 'kg', '⚖️', AppColors.primary),
];

class VitalsScreen extends StatefulWidget {
  const VitalsScreen({super.key});

  @override
  State<VitalsScreen> createState() => _VitalsScreenState();
}

class _VitalsScreenState extends State<VitalsScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();
  Map<String, dynamic>? _trends;
  String _selectedVital = 'BLOOD_PRESSURE';

  final _valueCtrl = TextEditingController();
  final _systolicCtrl = TextEditingController();
  final _diastolicCtrl = TextEditingController();
  bool _logLoading = false;

  @override
  void initState() {
    super.initState();
    _load();
    _socket.on('vital_recorded', _onVitalRecorded);
  }

  void _onVitalRecorded(dynamic _) {
    if (mounted) _load();
  }

  @override
  void dispose() {
    _socket.off('vital_recorded');
    _valueCtrl.dispose();
    _systolicCtrl.dispose();
    _diastolicCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final trendRes = await _api.get('/api/vitals/patients/$patientId/trends').catchError((_) => null as dynamic);
      // ignore: unused_local_variable
      final threshRes = await _api.get('/api/vitals/patients/$patientId/thresholds').catchError((_) => null as dynamic);
      if (mounted) {
        setState(() {
          _trends = trendRes.data;
        });
      }
    } catch (_) {}
  }

  Future<void> _onRefresh() async {
    await _load();
  }

  Future<void> _handleLog([StateSetter? setModalState]) async {
    if (_logLoading) return;
    final auth = context.read<AuthProvider>();
    final vc = _vitalConfigs.firstWhere((v) => v.type == _selectedVital);
    final payload = <String, dynamic>{
      'patientId': auth.activePatientId,
      'vitalType': _selectedVital,
      'source': 'MANUAL',
      'unit': vc.unit,
      'recordedAt': DateTime.now().toIso8601String(),
    };
    if (_selectedVital == 'BLOOD_PRESSURE') {
      if (_systolicCtrl.text.trim().isEmpty || _diastolicCtrl.text.trim().isEmpty) {
        context.showToast('Enter systolic and diastolic', type: ToastType.error);
        return;
      }
      payload['systolic'] = num.tryParse(_systolicCtrl.text.trim());
      payload['diastolic'] = num.tryParse(_diastolicCtrl.text.trim());
      if (payload['systolic'] == null || payload['diastolic'] == null) {
        context.showToast('Enter valid numbers', type: ToastType.error);
        return;
      }
    } else {
      if (_valueCtrl.text.trim().isEmpty) {
        context.showToast('Enter a value', type: ToastType.error);
        return;
      }
      payload['value'] = num.tryParse(_valueCtrl.text.trim());
      if (payload['value'] == null) {
        context.showToast('Enter a valid number', type: ToastType.error);
        return;
      }
    }

    setModalState?.call(() => _logLoading = true);
    setState(() => _logLoading = true);
    try {
      await _api.post('/api/vitals/readings', data: payload);
      if (mounted) {
        context.showToast('Vital reading logged!', type: ToastType.success);
        Navigator.pop(context);
        _valueCtrl.clear();
        _systolicCtrl.clear();
        _diastolicCtrl.clear();
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to log reading', type: ToastType.error);
    } finally {
      if (mounted) {
        setModalState?.call(() => _logLoading = false);
        setState(() => _logLoading = false);
      }
    }
  }

  dynamic _getLatest(String vitalType) {
    final t = _trends?['byType']?[vitalType];
    if (t == null || t['readings'] == null || (t['readings'] as List).isEmpty) return null;
    return (t['readings'] as List).last;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Vitals', style: AppTypography.bodyBold(size: AppTypography.xl)),
                  if (context.watch<AuthProvider>().canWrite)
                    GestureDetector(
                      onTap: () => _showLogModal(context),
                      child: Container(
                        width: 40, height: 40,
                        decoration: BoxDecoration(
                          color: AppColors.primaryFaint,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.primary),
                        ),
                        child: const Icon(Icons.add, size: 22, color: AppColors.primary),
                      ),
                    ),
                ],
              ),
            ),
            Expanded(
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
                      // Active alerts
                      if ((_trends?['activeAlerts'] as List?)?.isNotEmpty ?? false)
                        _buildActiveAlerts(),

                      // Vitals grid
                      Text('Current Readings',
                          style: AppTypography.bodyBold(size: AppTypography.md)),
                      const SizedBox(height: 12),
                      _buildVitalsGrid(context),
                      const SizedBox(height: 24),

                      // Trend summary
                      if (_trends != null) ...[
                        Text('7-Day Summary',
                            style: AppTypography.bodyBold(size: AppTypography.md)),
                        const SizedBox(height: 12),
                        AppCard(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Total Readings: ${_trends?['totalReadings'] ?? 0}',
                                  style: AppTypography.body(size: AppTypography.sm, color: AppColors.textSecondary)),
                              const SizedBox(height: 6),
                              Text('Alerts Triggered: ${_trends?['alertsTriggered'] ?? 0}',
                                  style: AppTypography.body(size: AppTypography.sm, color: AppColors.textSecondary)),
                              const SizedBox(height: 6),
                              Text('Active Alerts: ${(_trends?['activeAlerts'] as List?)?.length ?? 0}',
                                  style: AppTypography.body(size: AppTypography.sm, color: AppColors.textSecondary)),
                            ],
                          ),
                        ),
                      ],
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveAlerts() {
    final alerts = (_trends?['activeAlerts'] as List?) ?? [];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('⚠️ Active Alerts', style: AppTypography.bodyBold(size: AppTypography.md)),
        const SizedBox(height: 12),
        ...alerts.map((alert) => Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: AppCard(
            glowColor: AppColors.danger,
            child: Row(
              children: [
                const Text('🚨', style: TextStyle(fontSize: 20)),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text((alert['vitalType'] ?? '').replaceAll('_', ' '),
                          style: AppTypography.bodyBold(size: AppTypography.sm)),
                      const SizedBox(height: 2),
                      Text((alert['alertType'] ?? '').replaceAll('_', ' '),
                          style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                    ],
                  ),
                ),
                AppBadge(label: alert['severity'] ?? 'HIGH', variant: BadgeVariant.danger),
              ],
            ),
          ),
        )),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildVitalsGrid(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: _vitalConfigs.map((vc) {
        final latest = _getLatest(vc.type);
        String display = '—';
        if (latest != null) {
          if (vc.type == 'BLOOD_PRESSURE') {
            display = '${latest['systolic']}/${latest['diastolic']}';
          } else {
            display = '${latest['value'] ?? '—'}';
          }
        }

        final width = (MediaQuery.of(context).size.width - AppSpacing.base * 2 - 10) / 2;

        return GestureDetector(
          onTap: () {
            if (!context.read<AuthProvider>().canWrite) return;
            setState(() => _selectedVital = vc.type);
            _showLogModal(context);
          },
          child: Container(
            width: width,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: vc.color.withValues(alpha: 0.19)),
            ),
            child: Column(
              children: [
                Text(vc.icon, style: const TextStyle(fontSize: 28)),
                const SizedBox(height: 6),
                Text(display,
                    style: AppTypography.bodyBold(
                        size: AppTypography.xl,
                        color: latest != null ? vc.color : AppColors.textMuted)),
                Text(vc.unit,
                    style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                const SizedBox(height: 4),
                Text(vc.label,
                    textAlign: TextAlign.center,
                    style: AppTypography.body(size: AppTypography.xs, color: AppColors.textSecondary)),
                if (latest != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    _formatDate(latest['recordedAt']),
                    style: const TextStyle(fontSize: 10, color: AppColors.textMuted),
                  ),
                ],
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  String _formatDate(String? dateStr) {
    if (dateStr == null) return '';
    final d = DateTime.tryParse(dateStr);
    if (d == null) return '';
    return '${d.month}/${d.day}/${d.year}';
  }

  void _showLogModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.only(
            left: AppSpacing.base,
            right: AppSpacing.base,
            bottom: MediaQuery.of(ctx).viewInsets.bottom,
          ),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Log Vital Reading', style: AppTypography.bodyBold(size: AppTypography.lg)),
                    IconButton(
                      onPressed: () => Navigator.pop(ctx),
                      icon: const Icon(Icons.close, color: AppColors.textSecondary),
                    ),
                  ],
                ),
                const Divider(color: AppColors.surfaceBorder),
                const SizedBox(height: 8),
                Text('Vital Type',
                    style: AppTypography.bodyMedium(size: AppTypography.sm, color: AppColors.textSecondary)),
                const SizedBox(height: 8),
                SizedBox(
                  height: 40,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: _vitalConfigs.length,
                    separatorBuilder: (_, index2) => const SizedBox(width: 8),
                    itemBuilder: (_, i) {
                      final vc = _vitalConfigs[i];
                      final isSelected = _selectedVital == vc.type;
                      return GestureDetector(
                        onTap: () {
                          setModalState(() => _selectedVital = vc.type);
                          setState(() {});
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? vc.color.withValues(alpha: 0.19)
                                : AppColors.surfaceElevated,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isSelected ? vc.color : AppColors.surfaceBorder,
                            ),
                          ),
                          child: Text('${vc.icon} ${vc.label}',
                              style: AppTypography.body(size: AppTypography.sm)),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 16),
                if (_selectedVital == 'BLOOD_PRESSURE')
                  Row(
                    children: [
                      Expanded(
                        child: AppInput(
                          label: 'Systolic (mmHg)',
                          placeholder: '120',
                          controller: _systolicCtrl,
                          keyboardType: TextInputType.number,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: AppInput(
                          label: 'Diastolic (mmHg)',
                          placeholder: '80',
                          controller: _diastolicCtrl,
                          keyboardType: TextInputType.number,
                        ),
                      ),
                    ],
                  )
                else
                  AppInput(
                    label: 'Value (${_vitalConfigs.firstWhere((v) => v.type == _selectedVital).unit})',
                    placeholder: 'Enter reading',
                    controller: _valueCtrl,
                    keyboardType: TextInputType.number,
                  ),
                AppButton(
                  label: 'Log Reading',
                  onPressed: () => _handleLog(setModalState),
                  loading: _logLoading,
                  disabled: _logLoading,
                  fullWidth: true,
                  margin: const EdgeInsets.only(top: 8),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
