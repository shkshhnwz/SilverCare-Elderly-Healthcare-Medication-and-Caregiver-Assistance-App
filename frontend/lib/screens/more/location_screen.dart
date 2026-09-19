// lib/screens/more/location_screen.dart
// Location Safety — safe zones & geofencing (PRD 6.5)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_toast.dart';

class LocationScreen extends StatefulWidget {
  const LocationScreen({super.key});
  @override
  State<LocationScreen> createState() => _LocationScreenState();
}

class _LocationScreenState extends State<LocationScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _geofences = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final user = context.read<AuthProvider>().user;
    if (user == null) return;
    try {
      final res = await _api.get('/api/geofences/patients/${user.id}');
      if (mounted) setState(() { _geofences = res.data ?? []; _loading = false; });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Location Safety'), backgroundColor: AppColors.background),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : ListView(
              padding: const EdgeInsets.all(AppSpacing.base),
              children: [
                AppCard(
                  child: Column(
                    children: [
                      const Icon(Icons.location_on, size: 48, color: AppColors.accent),
                      const SizedBox(height: 12),
                      Text('Location Safety', style: AppTypography.bodyBold(size: AppTypography.lg)),
                      const SizedBox(height: 4),
                      Text('Define safe zones for wandering-risk patients. Receive alerts when they leave designated areas.',
                          textAlign: TextAlign.center,
                          style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Text('Safe Zones', style: AppTypography.bodyBold(size: AppTypography.md)),
                const SizedBox(height: 12),
                if (_geofences.isEmpty)
                  AppCard(
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    child: Column(
                      children: [
                        Text('📍 No safe zones configured', style: AppTypography.body(color: AppColors.textMuted)),
                        const SizedBox(height: 8),
                        AppButton(
                          label: 'Add Safe Zone',
                          onPressed: () => context.showToast('Safe zone creation coming soon', type: ToastType.info),
                          variant: AppButtonVariant.ghost,
                        ),
                      ],
                    ),
                  )
                else
                  ..._geofences.map((gf) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: AppCard(
                      child: Row(
                        children: [
                          Container(
                            width: 40, height: 40,
                            decoration: BoxDecoration(color: AppColors.accentFaint, borderRadius: BorderRadius.circular(10)),
                            child: const Icon(Icons.my_location, color: AppColors.accent),
                          ),
                          const SizedBox(width: 12),
                          Expanded(child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(gf['name'] ?? 'Safe Zone', style: AppTypography.bodySemiBold()),
                              Text('Radius: ${gf['radius'] ?? '—'}m', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                            ],
                          )),
                          AppBadge(label: gf['active'] == true ? 'Active' : 'Inactive',
                              variant: gf['active'] == true ? BadgeVariant.success : BadgeVariant.muted),
                        ],
                      ),
                    ),
                  )),
              ],
            ),
    );
  }
}
