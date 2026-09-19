// lib/screens/more/reports_screen.dart
// Reporting & Insights (PRD 6.9)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
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
    _load();
  }

  Future<void> _load() async {
    final user = context.read<AuthProvider>().user;
    if (user == null) return;
    try {
      final res = await _api.get('/api/reports/patients/${user.id}');
      if (mounted) setState(() { _reports = res.data ?? []; _loading = false; });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _generateReport(String type) async {
    setState(() => _generating = true);
    try {
      final user = context.read<AuthProvider>().user;
      await _api.post('/api/reports/generate', data: {
        'patientId': user!.id,
        'reportType': type,
      });
      if (mounted) {
        context.showToast('Report generated!', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to generate report', type: ToastType.error);
    } finally {
      if (mounted) setState(() => _generating = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Reports'), backgroundColor: AppColors.background),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : ListView(
              padding: const EdgeInsets.all(AppSpacing.base),
              children: [
                // Generate buttons
                Text('Generate Report', style: AppTypography.bodyBold(size: AppTypography.md)),
                const SizedBox(height: 12),
                Row(children: [
                  Expanded(child: AppCard(
                    onTap: () => _generateReport('ADHERENCE'),
                    child: Column(children: [
                      const Icon(Icons.medical_services, size: 32, color: AppColors.primary),
                      const SizedBox(height: 8),
                      Text('Adherence', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                      Text('Medication report', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                    ]),
                  )),
                  const SizedBox(width: 10),
                  Expanded(child: AppCard(
                    onTap: () => _generateReport('VITALS'),
                    child: Column(children: [
                      const Icon(Icons.favorite, size: 32, color: AppColors.danger),
                      const SizedBox(height: 8),
                      Text('Vitals', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                      Text('Health trends', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                    ]),
                  )),
                  const SizedBox(width: 10),
                  Expanded(child: AppCard(
                    onTap: () => _generateReport('FULL'),
                    child: Column(children: [
                      const Icon(Icons.description, size: 32, color: AppColors.info),
                      const SizedBox(height: 8),
                      Text('Full', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                      Text('Complete report', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                    ]),
                  )),
                ]),
                if (_generating)
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 16),
                    child: Center(child: CircularProgressIndicator(color: AppColors.primary)),
                  ),
                const SizedBox(height: 24),
                Text('Past Reports', style: AppTypography.bodyBold(size: AppTypography.md)),
                const SizedBox(height: 12),
                if (_reports.isEmpty)
                  AppCard(
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    child: Center(child: Text('📊 No reports generated yet', style: AppTypography.body(color: AppColors.textMuted))),
                  )
                else
                  ..._reports.map((report) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: AppCard(
                      child: Row(children: [
                        const Icon(Icons.insert_drive_file, color: AppColors.info),
                        const SizedBox(width: 12),
                        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(report['title'] ?? 'Report', style: AppTypography.bodySemiBold()),
                          Text(report['createdAt'] ?? '', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                        ])),
                        AppBadge(label: report['type'] ?? 'Report', variant: BadgeVariant.info),
                      ]),
                    ),
                  )),
              ],
            ),
    );
  }
}
