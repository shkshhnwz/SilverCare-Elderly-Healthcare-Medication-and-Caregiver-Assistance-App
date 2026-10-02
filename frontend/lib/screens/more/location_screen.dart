// lib/screens/more/location_screen.dart
// Location Safety — safe zones & geofencing (PRD 6.5)

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
import '../../core/location_service.dart';

class LocationScreen extends StatefulWidget {
  const LocationScreen({super.key});
  @override
  State<LocationScreen> createState() => _LocationScreenState();
}

class _LocationScreenState extends State<LocationScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();
  List<dynamic> _geofences = [];
  List<dynamic> _activeAlerts = [];
  Map<String, dynamic>? _trackingSession;
  bool _isTrackingActive = false;
  bool _loading = true;
  bool _createLoading = false;
  bool _pingLoading = false;

  final _nameCtrl = TextEditingController();
  final _radiusCtrl = TextEditingController(text: '500');
  final _latCtrl = TextEditingController(text: '19.0760');
  final _lngCtrl = TextEditingController(text: '72.8777');

  @override
  void initState() {
    super.initState();
    _load();
    _socket.on('safe_zone_created', _onSocketUpdate);
    _socket.on('safe_zone_deleted', _onSocketUpdate);
    _socket.on('location_alert', _onSocketUpdate);
    _socket.on('location_alert_resolved', _onSocketUpdate);
    _socket.on('location_ping', _onSocketUpdate);
  }

  void _onSocketUpdate(dynamic _) {
    if (mounted) _load();
  }

  @override
  void dispose() {
    _socket.off('safe_zone_created');
    _socket.off('safe_zone_deleted');
    _socket.off('location_alert');
    _socket.off('location_alert_resolved');
    _socket.off('location_ping');
    _nameCtrl.dispose();
    _radiusCtrl.dispose();
    _latCtrl.dispose();
    _lngCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) {
      if (mounted) setState(() => _loading = false);
      return;
    }
    try {
      final results = await Future.wait([
        _api.get('/api/location-safety/patients/$patientId/safe-zones'),
        _api.get('/api/location-safety/patients/$patientId/tracking-status'),
      ]);

      final zonesRes = results[0];
      final statusRes = results[1];

      if (mounted) {
        setState(() {
          _geofences = zonesRes.data as List<dynamic>? ?? [];
          final statusData = statusRes.data is Map<String, dynamic>
              ? statusRes.data as Map<String, dynamic>
              : {};
          _isTrackingActive = statusData['isTrackingActive'] == true;
          _trackingSession = statusData['session'] is Map<String, dynamic>
              ? statusData['session'] as Map<String, dynamic>
              : null;
          _activeAlerts = statusData['activeAlerts'] as List<dynamic>? ?? [];
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _pingCurrentLocation() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) {
      context.showToast('No active care recipient selected', type: ToastType.error);
      return;
    }

    setState(() => _pingLoading = true);
    context.showToast('Acquiring GPS fix & evaluating boundaries...', type: ToastType.info);

    try {
      final res = await LocationService.sendLocationPing(patientId: patientId);
      if (!mounted) return;
      setState(() => _pingLoading = false);

      if (res != null) {
        final inside = res['isInsideSafeZone'] == true;
        if (inside) {
          context.showToast('✅ Inside safe zone boundaries. No breach.', type: ToastType.success);
        } else {
          final alert = res['alert'];
          final drift = alert != null ? '${alert['driftDistanceM']}m' : '';
          context.showToast('⚠️ Breach detected! $drift outside safe zone.', type: ToastType.error);
        }
        _load();
      } else {
        context.showToast('Could not acquire GPS position.', type: ToastType.error);
      }
    } catch (e) {
      if (mounted) {
        setState(() => _pingLoading = false);
        context.showToast('Failed to evaluate location: $e', type: ToastType.error);
      }
    }
  }

  Future<void> _deleteSafeZone(String zoneId) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Safe Zone'),
        content: const Text('Are you sure you want to remove this safe zone boundary?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Delete', style: TextStyle(color: AppColors.error)),
          ),
        ],
      ),
    );
    if (confirmed != true) return;

    try {
      await _api.delete('/api/location-safety/safe-zones/$zoneId');
      if (mounted) {
        context.showToast('Safe zone deleted successfully', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to delete safe zone', type: ToastType.error);
    }
  }

  Future<void> _resolveAlert(String alertId) async {
    final notesCtrl = TextEditingController(text: 'Caregiver confirmed patient safe and returned home.');
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Resolve Geofence Alert'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Enter resolution note confirming care recipient recovery details:',
              style: TextStyle(fontSize: 13, color: AppColors.textMuted),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: notesCtrl,
              maxLines: 2,
              decoration: const InputDecoration(
                hintText: 'e.g., Accompanied home safely...',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.success),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Resolve Alert', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );

    if (confirmed != true) return;
    try {
      await _api.patch('/api/location-safety/alerts/$alertId/resolve', data: {
        'resolutionNotes': notesCtrl.text.trim(),
      });
      if (mounted) {
        context.showToast('Alert resolved safely', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to resolve alert', type: ToastType.error);
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
                TextButton.icon(
                  onPressed: () async {
                    final pos = await LocationService.getCurrentPosition();
                    if (pos != null) {
                      setModalState(() {
                        _latCtrl.text = pos.latitude.toStringAsFixed(6);
                        _lngCtrl.text = pos.longitude.toStringAsFixed(6);
                      });
                      setState(() {
                        _latCtrl.text = pos.latitude.toStringAsFixed(6);
                        _lngCtrl.text = pos.longitude.toStringAsFixed(6);
                      });
                      context.showToast('Current GPS location captured!', type: ToastType.success);
                    } else {
                      context.showToast('Could not obtain current GPS location', type: ToastType.error);
                    }
                  },
                  icon: const Icon(Icons.my_location, size: 16, color: AppColors.primary),
                  label: const Text(
                    'Use My Current GPS Location',
                    style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600),
                  ),
                ),
                const SizedBox(height: 12),
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
                  // 1. ACTIVE GEOFENCE BREACH ALERT BANNER
                  if (_activeAlerts.isNotEmpty) ...[
                    ..._activeAlerts.map((alert) {
                      final driftM = alert['driftDistanceM'] ?? 0;
                      final mapUrl = alert['mapUrl'] ?? '';
                      final alertId = alert['id'] ?? '';
                      return Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: AppColors.errorFaint,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.error.withValues(alpha: 0.4), width: 1.5),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.warning_amber_rounded, color: AppColors.error, size: 24),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    'CRITICAL: Safe Zone Breach Detected!',
                                    style: AppTypography.bodyBold(size: AppTypography.md, color: AppColors.error),
                                  ),
                                ),
                                AppBadge(label: 'ACTIVE', variant: BadgeVariant.error),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Patient has drifted ${driftM}m beyond configured safe boundaries. Emergency tracking active.',
                              style: AppTypography.body(size: AppTypography.sm, color: AppColors.textPrimary),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Last Known: Lat ${alert['lastKnownLat']}, Lng ${alert['lastKnownLng']}',
                              style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                            ),
                            const SizedBox(height: 12),
                            Row(
                              children: [
                                if (mapUrl.isNotEmpty)
                                  Expanded(
                                    child: OutlinedButton.icon(
                                      style: OutlinedButton.styleFrom(
                                        foregroundColor: AppColors.primary,
                                        side: const BorderSide(color: AppColors.primary),
                                        padding: const EdgeInsets.symmetric(vertical: 8),
                                      ),
                                      onPressed: () {
                                        Clipboard.setData(ClipboardData(text: mapUrl));
                                        context.showToast('Google Maps URL copied to clipboard!', type: ToastType.success);
                                      },
                                      icon: const Icon(Icons.map_outlined, size: 16),
                                      label: const Text('Copy Map Link', style: TextStyle(fontSize: 12)),
                                    ),
                                  ),
                                const SizedBox(width: 8),
                                if (context.watch<AuthProvider>().canWrite && alertId.isNotEmpty)
                                  Expanded(
                                    child: ElevatedButton.icon(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: AppColors.success,
                                        foregroundColor: Colors.white,
                                        padding: const EdgeInsets.symmetric(vertical: 8),
                                      ),
                                      onPressed: () => _resolveAlert(alertId),
                                      icon: const Icon(Icons.check_circle_outline, size: 16),
                                      label: const Text('Resolve Alert', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                    ),
                                  ),
                              ],
                            ),
                          ],
                        ),
                      );
                    }),
                  ],

                  // 2. ACTIVE EMERGENCY TRACKING CARD
                  if (_isTrackingActive && _trackingSession != null) ...[
                    AppCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 10,
                                height: 10,
                                decoration: const BoxDecoration(
                                  color: AppColors.accent,
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text('Live Emergency Tracking Window', style: AppTypography.bodyBold(size: AppTypography.sm)),
                              ),
                              AppBadge(label: '30m Window', variant: BadgeVariant.accent),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Time-boxed emergency tracking is actively recording breadcrumb pings to protect patient privacy.',
                            style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted),
                          ),
                          if (_trackingSession!['pings'] != null && (_trackingSession!['pings'] as List).isNotEmpty) ...[
                            const SizedBox(height: 8),
                            Text(
                              'Breadcrumb trail (${(_trackingSession!['pings'] as List).length} pings recorded)',
                              style: AppTypography.bodySemiBold(size: AppTypography.xs),
                            ),
                          ],
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],

                  // 3. OVERVIEW & MANUAL GPS FIX CARD
                  AppCard(
                    child: Column(
                      children: [
                        const Icon(Icons.location_on, size: 40, color: AppColors.accent),
                        const SizedBox(height: 8),
                        Text('Location Safety & Geofencing', style: AppTypography.bodyBold(size: AppTypography.lg)),
                        const SizedBox(height: 4),
                        Text(
                          'Designated safe zones for wandering-risk care recipients. Automatic alerts trigger if boundaries are breached.',
                          textAlign: TextAlign.center,
                          style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted),
                        ),
                        const SizedBox(height: 16),
                        AppButton(
                          label: _pingLoading ? 'Evaluating Position...' : 'Ping My Current GPS Location',
                          variant: AppButtonVariant.outline,
                          icon: Icons.my_location,
                          onPressed: _pingLoading ? null : _pingCurrentLocation,
                          loading: _pingLoading,
                          fullWidth: true,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // 4. CONFIGURED SAFE ZONES HEADER
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

                  // 5. SAFE ZONES LIST
                  if (_geofences.isEmpty)
                    AppCard(
                      padding: const EdgeInsets.symmetric(vertical: 24),
                      child: Column(
                        children: [
                          const Text('📍', style: TextStyle(fontSize: 40)),
                          const SizedBox(height: 8),
                          Text('No safe zones configured', style: AppTypography.bodyBold(size: AppTypography.md)),
                          const SizedBox(height: 4),
                          Text(
                            'Add boundaries to monitor wandering risk',
                            style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted),
                          ),
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
                      final zoneId = gf['id']?.toString() ?? '';
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
                              if (context.watch<AuthProvider>().canWrite && zoneId.isNotEmpty)
                                IconButton(
                                  icon: const Icon(Icons.delete_outline, size: 20, color: AppColors.error),
                                  onPressed: () => _deleteSafeZone(zoneId),
                                  tooltip: 'Delete Zone',
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
