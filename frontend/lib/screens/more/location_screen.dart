// lib/screens/more/location_screen.dart
// Location Safety — safe zones & geofencing (PRD 6.5)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../core/socket_service.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_input.dart';
import '../../widgets/app_toast.dart';

class LocationScreen extends StatefulWidget {
  const LocationScreen({super.key});
  @override
  State<LocationScreen> createState() => _LocationScreenState();
}

class _LocationScreenState extends State<LocationScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();
  List<dynamic> _geofences = [];
  bool _loading = true;
  bool _createLoading = false;

  final _nameCtrl = TextEditingController();
  final _radiusCtrl = TextEditingController(text: '500');
  final _latCtrl = TextEditingController(text: '19.0760');
  final _lngCtrl = TextEditingController(text: '72.8777');

  @override
  void initState() {
    super.initState();
    _load();
    _socket.on('safe_zone_created', _onSocketUpdate);
    _socket.on('location_alert', _onSocketUpdate);
  }

  void _onSocketUpdate(dynamic _) {
    if (mounted) _load();
  }

  @override
  void dispose() {
    _socket.off('safe_zone_created');
    _socket.off('location_alert');
    _nameCtrl.dispose();
    _radiusCtrl.dispose();
    _latCtrl.dispose();
    _lngCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final res = await _api.get('/api/location-safety/patients/$patientId/safe-zones');
      if (mounted) setState(() { _geofences = res.data as List<dynamic>? ?? []; _loading = false; });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _createSafeZone(BuildContext ctx, [StateSetter? setModalState]) async {
    if (_createLoading) return;
    final name = _nameCtrl.text.trim();
    if (name.isEmpty) {
      context.showToast('Please enter a safe zone name', type: ToastType.error);
      return;
    }
    final radius = double.tryParse(_radiusCtrl.text.trim()) ?? 500;
    final lat = double.tryParse(_latCtrl.text.trim()) ?? 19.0760;
    final lng = double.tryParse(_lngCtrl.text.trim()) ?? 72.8777;

    setModalState?.call(() => _createLoading = true);
    setState(() => _createLoading = true);

    try {
      final auth = context.read<AuthProvider>();
      await _api.post('/api/location-safety/safe-zones', data: {
        'patientId': auth.activePatientId,
        'name': name,
        'radiusMeters': radius,
        'latitude': lat,
        'longitude': lng,
      });

      if (mounted) {
        context.showToast('Safe zone created successfully!', type: ToastType.success);
        _nameCtrl.clear();
        Navigator.pop(ctx);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to create safe zone', type: ToastType.error);
    } finally {
      if (mounted) {
        setModalState?.call(() => _createLoading = false);
        setState(() => _createLoading = false);
      }
    }
  }

  void _showAddSafeZoneModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text('Create Safe Zone', style: AppTypography.bodyBold(size: AppTypography.lg)),
                ),
                const SizedBox(height: 16),
                AppInput(
                  label: 'Zone Name *',
                  placeholder: 'e.g., Home, Central Park, Clinic',
                  controller: _nameCtrl,
                  icon: Icons.place_outlined,
                ),
                AppInput(
                  label: 'Radius (Meters) *',
                  placeholder: '500',
                  controller: _radiusCtrl,
                  keyboardType: TextInputType.number,
                  icon: Icons.radar,
                ),
                Row(
                  children: [
                    Expanded(
                      child: AppInput(
                        label: 'Latitude',
                        placeholder: '19.0760',
                        controller: _latCtrl,
                        keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: AppInput(
                        label: 'Longitude',
                        placeholder: '72.8777',
                        controller: _lngCtrl,
                        keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                AppButton(
                  label: 'Save Safe Zone',
                  onPressed: () => _createSafeZone(ctx, setModalState),
                  loading: _createLoading,
                  disabled: _createLoading,
                  fullWidth: true,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Location Safety'),
        backgroundColor: AppColors.background,
        actions: [
          if (context.watch<AuthProvider>().canWrite)
            IconButton(
              icon: const Icon(Icons.add, color: AppColors.primary),
              onPressed: () => _showAddSafeZoneModal(context),
            ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : RefreshIndicator(
              onRefresh: _load,
              color: AppColors.primary,
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.base),
                children: [
                  AppCard(
                    child: Column(
                      children: [
                        const Icon(Icons.location_on, size: 48, color: AppColors.accent),
                        const SizedBox(height: 12),
                        Text('Location Safety & Geofencing', style: AppTypography.bodyBold(size: AppTypography.lg)),
                        const SizedBox(height: 4),
                        Text(
                          'Define safe zones for wandering-risk care recipients. Receive immediate alerts if they leave designated boundaries.',
                          textAlign: TextAlign.center,
                          style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Configured Safe Zones', style: AppTypography.bodyBold(size: AppTypography.md)),
                      if (_geofences.isNotEmpty && context.watch<AuthProvider>().canWrite)
                        TextButton.icon(
                          onPressed: () => _showAddSafeZoneModal(context),
                          icon: const Icon(Icons.add, size: 16, color: AppColors.primary),
                          label: const Text('Add Zone', style: TextStyle(color: AppColors.primary, fontSize: 13)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  if (_geofences.isEmpty)
                    AppCard(
                      padding: const EdgeInsets.symmetric(vertical: 24),
                      child: Column(
                        children: [
                          const Text('📍', style: TextStyle(fontSize: 40)),
                          const SizedBox(height: 8),
                          Text('No safe zones configured', style: AppTypography.bodyBold(size: AppTypography.md)),
                          const SizedBox(height: 4),
                          Text('Add boundaries to monitor wandering risk',
                              style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
                          const SizedBox(height: 16),
                          AppButton(
                            label: 'Add Safe Zone',
                            onPressed: () => _showAddSafeZoneModal(context),
                            variant: AppButtonVariant.primary,
                          ),
                        ],
                      ),
                    )
                  else
                    ..._geofences.map((gf) {
                      final radius = gf['radiusMeters'] ?? gf['radius'] ?? '—';
                      final isActive = gf['isActive'] ?? gf['active'] ?? true;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: AppCard(
                          child: Row(
                            children: [
                              Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  color: AppColors.accentFaint,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Icon(Icons.my_location, color: AppColors.accent),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(gf['name'] ?? 'Safe Zone', style: AppTypography.bodySemiBold()),
                                    Text(
                                      'Radius: ${radius}m • Lat: ${gf['latitude'] ?? '—'}, Lng: ${gf['longitude'] ?? '—'}',
                                      style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                                    ),
                                  ],
                                ),
                              ),
                              AppBadge(
                                label: isActive == true ? 'Active' : 'Inactive',
                                variant: isActive == true ? BadgeVariant.success : BadgeVariant.muted,
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                ],
              ),
            ),
    );
  }
}
