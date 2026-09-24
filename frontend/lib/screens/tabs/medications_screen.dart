// lib/screens/tabs/medications_screen.dart
// Medication Management — adherence state machine per PRD 6.2
// Ported from medications.tsx

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

class MedicationsScreen extends StatefulWidget {
  const MedicationsScreen({super.key});

  @override
  State<MedicationsScreen> createState() => _MedicationsScreenState();
}

class _MedicationsScreenState extends State<MedicationsScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _medications = [];

  // Add form
  final _nameCtrl = TextEditingController();
  final _dosageCtrl = TextEditingController();
  final _routeCtrl = TextEditingController();
  String _selectedFreq = 'FREQ=DAILY;INTERVAL=1';
  final _doctorCtrl = TextEditingController();
  final _refillCtrl = TextEditingController(text: '30');
  bool _addLoading = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    _dosageCtrl.dispose();
    _routeCtrl.dispose();
    _doctorCtrl.dispose();
    _refillCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final res = await _api.get('/api/medications/patients/$patientId');
      if (mounted) setState(() => _medications = res.data ?? []);
    } catch (e) {
      if (mounted) context.showToast('Could not load medications', type: ToastType.error);
    }
  }

  Future<void> _onRefresh() async {
    await _load();
  }

  Future<void> _handleAdd([StateSetter? setModalState]) async {
    if (_addLoading) return;
    if (_nameCtrl.text.trim().isEmpty ||
        _dosageCtrl.text.trim().isEmpty ||
        _routeCtrl.text.trim().isEmpty ||
        _doctorCtrl.text.trim().isEmpty) {
      context.showToast('Please fill all required fields', type: ToastType.error);
      return;
    }
    setModalState?.call(() => _addLoading = true);
    setState(() => _addLoading = true);
    try {
      final auth = context.read<AuthProvider>();
      await _api.post('/api/medications', data: {
        'patientId': auth.activePatientId,
        'medicationName': _nameCtrl.text.trim(),
        'dosage': _dosageCtrl.text.trim(),
        'route': _routeCtrl.text.trim(),
        'frequencyRRule': _selectedFreq,
        'prescribingDoctor': _doctorCtrl.text.trim(),
        'refillQuantity': int.tryParse(_refillCtrl.text) ?? 30,
      });
      if (mounted) {
        context.showToast('Medication added!', type: ToastType.success);
        Navigator.of(context).pop();
        _clearForm();
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to add medication', type: ToastType.error);
    } finally {
      if (mounted) {
        setModalState?.call(() => _addLoading = false);
        setState(() => _addLoading = false);
      }
    }
  }

  void _clearForm() {
    _nameCtrl.clear();
    _dosageCtrl.clear();
    _routeCtrl.clear();
    setState(() => _selectedFreq = 'FREQ=DAILY;INTERVAL=1');
    _doctorCtrl.clear();
    _refillCtrl.text = '30';
  }

  Future<void> _acknowledge(String medId, String doseId, String action) async {
    try {
      await _api.post('/api/medications/$medId/doses/$doseId/acknowledge', data: {'action': action});
      if (mounted) {
        context.showToast(
          action == 'taken' ? '✅ Dose marked as taken!' : 'Dose skipped',
          type: action == 'taken' ? ToastType.success : ToastType.info,
        );
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Action failed', type: ToastType.error);
    }
  }

  Future<void> _scheduleNext(String medId) async {
    try {
      await _api.post('/api/medications/$medId/doses/schedule-next');
      if (mounted) {
        context.showToast('Next dose scheduled', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed', type: ToastType.error);
    }
  }

  BadgeVariant _doseVariant(String state) {
    switch (state) {
      case 'confirmed_taken': return BadgeVariant.success;
      case 'confirmed_skipped': return BadgeVariant.muted;
      case 'missed': case 'escalated': return BadgeVariant.danger;
      case 'notified': return BadgeVariant.warning;
      default: return BadgeVariant.info;
    }
  }

  String _doseLabel(String state) {
    switch (state) {
      case 'scheduled': return 'Scheduled';
      case 'notified': return 'Notified';
      case 'confirmed_taken': return 'Taken ✓';
      case 'confirmed_skipped': return 'Skipped';
      case 'missed': return 'Missed';
      case 'escalated': return 'Escalated 🚨';
      default: return state;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Medications', style: AppTypography.bodyBold(size: AppTypography.xl)),
                  if (context.watch<AuthProvider>().canWrite) _addButton(context),
                ],
              ),
            ),
            // Content
            Expanded(
              child: RefreshIndicator(
                onRefresh: _onRefresh,
                color: AppColors.primary,
                backgroundColor: AppColors.surface,
                child: _medications.isEmpty
                    ? _buildEmpty()
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base),
                        itemCount: _medications.length,
                        itemBuilder: (ctx, i) => _buildMedCard(_medications[i]),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _addButton(BuildContext context) {
    return GestureDetector(
      onTap: () => _showAddModal(context),
      child: Container(
        width: 40, height: 40,
        decoration: BoxDecoration(
          color: AppColors.primaryFaint,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.primary),
        ),
        child: const Icon(Icons.add, size: 22, color: AppColors.primary),
      ),
    );
  }

  Widget _buildEmpty() {
    return ListView(
      children: [
        const SizedBox(height: 40),
        AppCard(
          padding: const EdgeInsets.symmetric(vertical: 40),
          child: Column(
            children: [
              const Text('💊', style: TextStyle(fontSize: 40)),
              const SizedBox(height: 12),
              Text('No Medications Added',
                  style: AppTypography.bodyBold(size: AppTypography.lg)),
              const SizedBox(height: 4),
              if (context.watch<AuthProvider>().canWrite) ...[
                Text('Tap the + button to add a medication',
                    style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
                const SizedBox(height: 12),
                AppButton(
                  label: 'Add Medication',
                  onPressed: () => _showAddModal(context),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMedCard(dynamic med) {
    final doses = (med['doses'] as List?)?.reversed.take(3).toList() ?? [];
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: AppCard(
        child: Column(
          children: [
            // Header
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(med['medicationName'] ?? '',
                          style: AppTypography.bodyBold(size: AppTypography.md)),
                      const SizedBox(height: 2),
                      Text('${med['dosage']} · ${med['route']} · ${med['frequencyRRule']}',
                          style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                      const SizedBox(height: 2),
                      Text('Dr. ${med['prescribingDoctor'] ?? ''}',
                          style: AppTypography.body(size: AppTypography.xs, color: AppColors.primary)),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.primaryFaint,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      Text('${med['refillQuantity'] ?? 0}',
                          style: AppTypography.bodyBold(size: AppTypography.lg, color: AppColors.primary)),
                      Text('pills', style: TextStyle(fontSize: 10, color: AppColors.primary)),
                    ],
                  ),
                ),
              ],
            ),
            // Doses
            ...doses.map((dose) {
              final state = dose['state'] ?? 'scheduled';
              final isActionable = ['scheduled', 'notified'].contains(state);
              return Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  border: Border(top: BorderSide(color: AppColors.surfaceBorder)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _formatDateTime(dose['scheduledAt']),
                            style: AppTypography.body(size: AppTypography.xs, color: AppColors.textSecondary),
                          ),
                          const SizedBox(height: 4),
                          AppBadge(label: _doseLabel(state), variant: _doseVariant(state)),
                        ],
                      ),
                    ),
                    if (isActionable && context.watch<AuthProvider>().canWrite) ...[
                      GestureDetector(
                        onTap: () => _acknowledge(med['id'].toString(), dose['id'].toString(), 'taken'),
                        child: Container(
                          width: 32, height: 32,
                          decoration: BoxDecoration(
                            color: AppColors.successFaint,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.check, size: 16, color: AppColors.success),
                        ),
                      ),
                      const SizedBox(width: 8),
                      GestureDetector(
                        onTap: () => _acknowledge(med['id'].toString(), dose['id'].toString(), 'skipped'),
                        child: Container(
                          width: 32, height: 32,
                          decoration: BoxDecoration(
                            color: AppColors.warningFaint,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.close, size: 16, color: AppColors.warning),
                        ),
                      ),
                    ],
                  ],
                ),
              );
            }),
            if (context.watch<AuthProvider>().canWrite)
              GestureDetector(
                onTap: () => _scheduleNext(med['id'].toString()),
                child: Container(
                  padding: const EdgeInsets.only(top: 10),
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: AppColors.surfaceBorder)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.calendar_today_outlined, size: 14, color: AppColors.primary),
                      const SizedBox(width: 6),
                      Text('Schedule Next Dose',
                          style: AppTypography.bodySemiBold(size: AppTypography.xs, color: AppColors.primary)),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  String _formatDateTime(String? dateStr) {
    if (dateStr == null) return '';
    final d = DateTime.tryParse(dateStr);
    if (d == null) return dateStr;
    return '${d.month}/${d.day}/${d.year} ${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
  }

  void _showAddModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => DraggableScrollableSheet(
          expand: false,
          initialChildSize: 0.85,
          maxChildSize: 0.95,
          builder: (ctx, scrollController) => Padding(
            padding: EdgeInsets.only(
              left: AppSpacing.base,
              right: AppSpacing.base,
              bottom: MediaQuery.of(ctx).viewInsets.bottom,
            ),
            child: ListView(
              controller: scrollController,
              children: [
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Add Medication', style: AppTypography.bodyBold(size: AppTypography.lg)),
                    IconButton(
                      onPressed: () => Navigator.pop(ctx),
                      icon: const Icon(Icons.close, color: AppColors.textSecondary),
                    ),
                  ],
                ),
                const Divider(color: AppColors.surfaceBorder),
                const SizedBox(height: 8),
                AppInput(label: 'Medication Name *', placeholder: 'e.g., Metformin', controller: _nameCtrl, icon: Icons.medical_services_outlined),
                AppInput(label: 'Dosage *', placeholder: 'e.g., 500mg', controller: _dosageCtrl),
                AppInput(label: 'Route *', placeholder: 'e.g., Oral, Injection', controller: _routeCtrl),
                const Padding(
                  padding: EdgeInsets.only(bottom: 6.0, top: 4.0),
                  child: Text('Frequency *', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
                ),
                Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceElevated,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.surfaceBorder),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedFreq,
                      isExpanded: true,
                      dropdownColor: AppColors.surfaceElevated,
                      icon: const Icon(Icons.arrow_drop_down, color: AppColors.textMuted),
                      style: const TextStyle(color: Colors.white, fontSize: 16),
                      onChanged: (String? newValue) {
                        if (newValue != null) {
                          setModalState(() => _selectedFreq = newValue);
                          setState(() => _selectedFreq = newValue);
                        }
                      },
                      items: const [
                        DropdownMenuItem(value: 'FREQ=DAILY;INTERVAL=1', child: Text('Once Daily')),
                        DropdownMenuItem(value: 'FREQ=DAILY;INTERVAL=1;BYHOUR=8,20', child: Text('Twice Daily')),
                        DropdownMenuItem(value: 'FREQ=WEEKLY;INTERVAL=1', child: Text('Once a Week')),
                        DropdownMenuItem(value: 'FREQ=MONTHLY;INTERVAL=1', child: Text('Once a Month')),
                      ],
                    ),
                  ),
                ),
                AppInput(label: 'Prescribing Doctor *', placeholder: 'Dr. Smith', controller: _doctorCtrl, icon: Icons.person_outline),
                AppInput(label: 'Refill Quantity', placeholder: '30', controller: _refillCtrl, keyboardType: TextInputType.number),
                AppButton(
                  label: 'Add Medication',
                  onPressed: () => _handleAdd(setModalState),
                  loading: _addLoading,
                  disabled: _addLoading,
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
