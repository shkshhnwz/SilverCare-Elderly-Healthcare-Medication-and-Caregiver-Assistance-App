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

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});
  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _appointments = [];
  bool _loading = true;
  bool _createLoading = false;

  final _titleCtrl = TextEditingController();
  final _doctorCtrl = TextEditingController();
  final _locationCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
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

  Future<void> _createAppointment() async {
    if (_titleCtrl.text.trim().isEmpty || _doctorCtrl.text.trim().isEmpty) {
      context.showToast('Enter title and doctor name', type: ToastType.error);
      return;
    }
    setState(() => _createLoading = true);
    try {
      final auth = context.read<AuthProvider>();
      await _api.post('/api/appointments', data: {
        'patientId': auth.activePatientId,
        'title': _titleCtrl.text.trim(),
        'doctorName': _doctorCtrl.text.trim(),
        'clinicOrHospital': _locationCtrl.text.trim().isEmpty ? 'TBD' : _locationCtrl.text.trim(),
        'scheduledAt': DateTime.now().add(const Duration(days: 7)).toIso8601String(),
        'type': 'Visit',
      });
      if (mounted) {
        context.showToast('Appointment created!', type: ToastType.success);
        _titleCtrl.clear();
        _doctorCtrl.clear();
        _locationCtrl.clear();
        Navigator.pop(context);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed', type: ToastType.error);
    } finally {
      if (mounted) setState(() => _createLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Appointments'),
        backgroundColor: AppColors.background,
        actions: [
          if (context.watch<AuthProvider>().canWrite)
            IconButton(icon: const Icon(Icons.add, color: AppColors.primary),
                onPressed: () => _showCreateModal(context)),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : RefreshIndicator(
              onRefresh: _load,
              color: AppColors.primary,
              child: _appointments.isEmpty
                  ? ListView(children: [
                      const SizedBox(height: 60),
                      Center(child: Column(children: [
                        const Text('📅', style: TextStyle(fontSize: 48)),
                        const SizedBox(height: 12),
                        Text('No Appointments', style: AppTypography.bodyBold(size: AppTypography.lg)),
                        const SizedBox(height: 4),
                        Text('Schedule your next appointment', style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
                      ])),
                    ])
                  : ListView.builder(
                      padding: const EdgeInsets.all(AppSpacing.base),
                      itemCount: _appointments.length,
                      itemBuilder: (_, i) {
                        final apt = _appointments[i];
                        final date = DateTime.tryParse(apt['scheduledAt'] ?? '');
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: AppCard(
                            child: Row(
                              children: [
                                Container(
                                  width: 44, height: 44,
                                  decoration: BoxDecoration(color: AppColors.primaryFaint, borderRadius: BorderRadius.circular(12)),
                                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                                    Text('${date?.day ?? ''}', style: AppTypography.bodyBold(size: AppTypography.md, color: AppColors.primary)),
                                    Text(_monthShort(date), style: TextStyle(fontSize: 10, color: AppColors.primary)),
                                  ]),
                                ),
                                const SizedBox(width: 12),
                                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                                  Text(apt['title'] ?? 'Appointment', style: AppTypography.bodySemiBold()),
                                  Text(apt['location'] ?? 'Location TBD', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                                ])),
                                AppBadge(label: apt['type'] ?? 'Visit', variant: BadgeVariant.primary),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
    );
  }

  String _monthShort(DateTime? d) {
    if (d == null) return '';
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[d.month - 1];
  }

  void _showCreateModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => Padding(
        padding: EdgeInsets.fromLTRB(AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Text('New Appointment', style: AppTypography.bodyBold(size: AppTypography.lg)),
          const SizedBox(height: 16),
          AppInput(label: 'Title', placeholder: 'e.g., Cardiology Checkup', controller: _titleCtrl, icon: Icons.calendar_today),
          AppInput(label: 'Doctor Name', placeholder: 'e.g., Dr. Smith', controller: _doctorCtrl, icon: Icons.person_outline),
          AppInput(label: 'Location', placeholder: 'e.g., City Hospital', controller: _locationCtrl, icon: Icons.location_on_outlined),
          AppButton(label: 'Create', onPressed: _createAppointment, loading: _createLoading, fullWidth: true),
        ]),
      ),
    );
  }
}
