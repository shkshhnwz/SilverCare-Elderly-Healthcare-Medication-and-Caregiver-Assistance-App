// lib/screens/tabs/emergency_screen.dart
// Emergency / SOS Screen — one-tap SOS, escalation policy, active event tracking
// Ported from emergency.tsx

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../core/socket_service.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_toast.dart';

class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({super.key});

  @override
  State<EmergencyScreen> createState() => _EmergencyScreenState();
}

class _EmergencyScreenState extends State<EmergencyScreen>
    with SingleTickerProviderStateMixin {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();

  dynamic _activeEmergency;
  bool _sosLoading = false;

  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    );
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.12).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    _loadActive();
    _setupSocket();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _socket.off('emergency_triggered');
    _socket.off('emergency_resolved');
    super.dispose();
  }

  void _setupSocket() {
    _socket.on('emergency_triggered', (data) {
      if (!mounted) return;
      final event = (data is Map && data['event'] != null)
          ? data['event']
          : (data is Map && data['emergency'] != null)
              ? data['emergency']
              : data;
      setState(() => _activeEmergency = event);
      if (_activeEmergency != null) {
        _pulseController.repeat(reverse: true);
      }
    });
    _socket.on('emergency_resolved', (_) {
      if (!mounted) return;
      setState(() => _activeEmergency = null);
      _pulseController.stop();
    });
  }

  Future<void> _loadActive() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final res = await _api.get('/api/emergency/patients/$patientId/active');
      if (mounted) {
        final event = res.data?['emergency'] ?? res.data?['event'];
        setState(() => _activeEmergency = event);
        if (_activeEmergency != null) {
          _pulseController.repeat(reverse: true);
        } else {
          _pulseController.stop();
        }
      }
    } catch (_) {
      if (mounted) setState(() => _activeEmergency = null);
    }
  }

  Future<void> _onRefresh() async {
    await _loadActive();
  }

  Future<void> _triggerSOS() async {
    if (_sosLoading) return;

    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: const Text('🚨 Trigger Emergency SOS?',
            style: TextStyle(color: AppColors.textPrimary)),
        content: const Text(
            'This will immediately alert all your care circle members.',
            style: TextStyle(color: AppColors.textSecondary)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: TextButton.styleFrom(foregroundColor: AppColors.danger),
            child: const Text('TRIGGER SOS'),
          ),
        ],
      ),
    );

    if (confirm != true || !mounted) return;
    if (_sosLoading) return;

    setState(() => _sosLoading = true);
    try {
      final auth = context.read<AuthProvider>();
      final patientId = auth.activePatientId;
      await _api.post('/api/emergency/trigger', data: {
        'patientId': patientId,
        'eventType': 'ONE_TAP_SOS',
        'triggerType': 'MANUAL_SOS',
        'location': null,
      });
      if (mounted) {
        context.showToast('🚨 Emergency SOS triggered! Care circle notified.',
            type: ToastType.error);
        _loadActive();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to trigger SOS', type: ToastType.error);
    } finally {
      if (mounted) setState(() => _sosLoading = false);
    }
  }

  Future<void> _resolveEmergency(String eventId) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: const Text('Resolve Emergency?',
            style: TextStyle(color: AppColors.textPrimary)),
        content: const Text('Mark this emergency as resolved.',
            style: TextStyle(color: AppColors.textSecondary)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Resolve'),
          ),
        ],
      ),
    );
    if (confirm != true) return;

    try {
      await _api.patch('/api/emergency/$eventId/resolve',
          data: {'resolutionNote': 'Resolved by patient/caregiver'});
      if (mounted) {
        context.showToast('Emergency resolved', type: ToastType.success);
        setState(() => _activeEmergency = null);
        _pulseController.stop();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed', type: ToastType.error);
    }
  }

  Future<void> _acknowledgeEmergency(String eventId) async {
    try {
      await _api.patch('/api/emergency/$eventId/acknowledge');
      if (mounted) {
        context.showToast('Emergency acknowledged', type: ToastType.success);
        _loadActive();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed', type: ToastType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.base, vertical: 12),
              child: Text('Emergency & SOS',
                  style: AppTypography.bodyBold(size: AppTypography.xl)),
            ),
            Expanded(
              child: RefreshIndicator(
                onRefresh: _onRefresh,
                color: AppColors.danger,
                backgroundColor: AppColors.surface,
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base),
                  child: Column(
                    children: [
                      // Active emergency banner
                      if (_activeEmergency != null) _buildActiveBanner(),

                      // Giant SOS button
                      _buildSOSButton(),

                      // Info cards
                      _buildInfoCards(),

                      // Escalation policy
                      AppCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Escalation Policy',
                                style: AppTypography.bodyBold(size: AppTypography.md)),
                            const SizedBox(height: 4),
                            Text(
                                'Configure who gets notified and in what order when an emergency occurs.',
                                style: AppTypography.body(
                                    size: AppTypography.sm,
                                    color: AppColors.textMuted)),
                            const SizedBox(height: 10),
                            AppButton(
                              label: 'Configure Policy',
                              onPressed: () => context.showToast(
                                  'Escalation policy configuration coming soon',
                                  type: ToastType.info),
                              variant: AppButtonVariant.ghost,
                            ),
                          ],
                        ),
                      ),
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

  Widget _buildActiveBanner() {
    final id = _activeEmergency['id']?.toString() ?? '';
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: AppCard(
        glowColor: AppColors.danger,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('🚨 ACTIVE EMERGENCY',
                    style: AppTypography.bodyBold(
                        size: AppTypography.md, color: AppColors.danger)),
                AppBadge(
                    label: _activeEmergency['status'] ?? 'ACTIVE',
                    variant: BadgeVariant.danger),
              ],
            ),
            const SizedBox(height: 8),
            Text(
                (_activeEmergency['eventType'] ?? _activeEmergency['triggerType'] ?? 'ONE TAP SOS')
                    .toString()
                    .replaceAll('_', ' '),
                style: AppTypography.bodySemiBold()),
            const SizedBox(height: 4),
            Text(
                'Since ${_formatTime(_activeEmergency['createdAt'])}',
                style: AppTypography.body(
                    size: AppTypography.xs, color: AppColors.textMuted)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: AppButton(
                    label: 'Acknowledge',
                    onPressed: () => _acknowledgeEmergency(id),
                    variant: AppButtonVariant.warning,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: AppButton(
                    label: 'Resolve',
                    onPressed: () => _resolveEmergency(id),
                    variant: AppButtonVariant.secondary,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSOSButton() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 32),
      child: Column(
        children: [
          Text(
            _activeEmergency != null
                ? 'Emergency is active'
                : 'Press in case of emergency',
            style: AppTypography.body(
                size: AppTypography.sm, color: AppColors.textMuted),
          ),
          const SizedBox(height: 24),
          AnimatedBuilder(
            animation: _pulseAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _activeEmergency != null ? _pulseAnimation.value : 1.0,
                child: Container(
                  width: 200,
                  height: 200,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: _activeEmergency != null
                          ? AppColors.danger
                          : AppColors.sos.withValues(alpha: 0.25),
                      width: 3,
                    ),
                  ),
                  child: Center(
                    child: GestureDetector(
                      onTap: _sosLoading ? null : _triggerSOS,
                      child: Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _activeEmergency != null
                              ? AppColors.sosDark
                              : AppColors.sos,
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.sos.withValues(alpha: 0.5),
                              blurRadius: 20,
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.error, size: 48, color: Colors.white),
                            const SizedBox(height: 4),
                            Text('SOS',
                                style: AppTypography.bodyBold(
                                        size: 28, color: Colors.white)
                                    .copyWith(
                                        fontWeight: FontWeight.w900,
                                        letterSpacing: 2)),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: 260,
            child: Text(
              'Your location and care circle will be immediately notified',
              textAlign: TextAlign.center,
              style: AppTypography.body(
                  size: AppTypography.xs, color: AppColors.textMuted),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCards() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        children: [
          Expanded(
            child: AppCard(
              child: Column(
                children: [
                  const Icon(Icons.verified_user, size: 28, color: AppColors.success),
                  const SizedBox(height: 8),
                  Text('Escalation Policy',
                      textAlign: TextAlign.center,
                      style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 4),
                  Text(
                      'Your care circle members will be notified in configured order with SMS fallback',
                      textAlign: TextAlign.center,
                      style: AppTypography.body(
                          size: AppTypography.xs, color: AppColors.textMuted)),
                ],
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: AppCard(
              child: Column(
                children: [
                  const Icon(Icons.location_on, size: 28, color: AppColors.accent),
                  const SizedBox(height: 8),
                  Text('Live Location',
                      textAlign: TextAlign.center,
                      style: AppTypography.bodyBold(size: AppTypography.sm)),
                  const SizedBox(height: 4),
                  Text(
                      'Location is shared automatically during an active emergency',
                      textAlign: TextAlign.center,
                      style: AppTypography.body(
                          size: AppTypography.xs, color: AppColors.textMuted)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _formatTime(String? dateStr) {
    if (dateStr == null) return '';
    final d = DateTime.tryParse(dateStr);
    if (d == null) return '';
    return '${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
  }
}
