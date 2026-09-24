// lib/screens/more/care_circle_screen.dart
// Care Circle management — members, invitations, roles
// Ported from care-circle.tsx

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

class CareCircleScreen extends StatefulWidget {
  const CareCircleScreen({super.key});

  @override
  State<CareCircleScreen> createState() => _CareCircleScreenState();
}

class _CareCircleScreenState extends State<CareCircleScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _circles = [];
  List<dynamic> _invitations = [];
  bool _loading = true;
  bool _createLoading = false;
  bool _inviteLoading = false;

  final _circleNameCtrl = TextEditingController();
  final _inviteEmailCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _circleNameCtrl.dispose();
    _inviteEmailCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final user = context.read<AuthProvider>().user;
    if (user == null) return;
    try {
      final circlesRes = await _api.get('/api/care-circles/users/${user.id}');
      final invRes = await _api.get('/api/care-circles/invitations/users/${user.id}');
      if (mounted) {
        setState(() {
          _circles = circlesRes.data ?? [];
          _invitations = invRes.data ?? [];
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _createCircle(
    BuildContext modalContext,
    StateSetter setModalState, {
    bool patientCoOwn = false,
  }) async {
    if (_createLoading) return;
    final name = _circleNameCtrl.text.trim();
    if (name.isEmpty) {
      context.showToast('Enter a circle name', type: ToastType.error);
      return;
    }

    setModalState(() => _createLoading = true);
    setState(() => _createLoading = true);

    try {
      final user = context.read<AuthProvider>().user;
      await _api.post('/api/care-circles', data: {
        'name': name,
        'patientId': user!.id,
        'patientCoOwn': patientCoOwn,
      });
      if (mounted) {
        context.showToast('Care circle created!', type: ToastType.success);
        _circleNameCtrl.clear();
        Navigator.pop(modalContext);
        context.read<AuthProvider>().fetchUserCircles();
        _load();
      }
    } catch (e) {
      if (mounted) {
        final errMsg = e.toString().contains('already exists')
            ? 'A care circle with this name already exists'
            : 'Failed to create circle';
        context.showToast(errMsg, type: ToastType.error);
      }
    } finally {
      if (mounted) {
        setModalState(() => _createLoading = false);
        setState(() => _createLoading = false);
      }
    }
  }

  Future<void> _sendInvite(
    BuildContext modalContext,
    StateSetter setModalState,
    String circleId,
    String roleName,
  ) async {
    if (_inviteLoading) return;
    final email = _inviteEmailCtrl.text.trim();
    if (email.isEmpty) {
      context.showToast('Enter an email or phone', type: ToastType.error);
      return;
    }
    setModalState(() => _inviteLoading = true);
    setState(() => _inviteLoading = true);
    try {
      await _api.post('/api/care-circles/$circleId/invitations', data: {
        'email': email,
        'roleName': roleName,
      });
      if (mounted) {
        context.showToast('Invitation sent!', type: ToastType.success);
        _inviteEmailCtrl.clear();
        Navigator.pop(modalContext);
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to send invite', type: ToastType.error);
    } finally {
      if (mounted) {
        setModalState(() => _inviteLoading = false);
        setState(() => _inviteLoading = false);
      }
    }
  }

  Future<void> _acceptInvite(String invitationId) async {
    setState(() => _loading = true);
    try {
      await _api.post('/api/care-circles/invitations/accept', data: {
        'invitationId': invitationId,
      });
      if (mounted) {
        setState(() {
          _invitations.removeWhere((inv) => inv['id'].toString() == invitationId);
        });
        context.showToast('Invitation accepted!', type: ToastType.success);
        _load();
      }
    } catch (e) {
      print('Accept Invite Error: $e');
      if (mounted) {
        setState(() => _loading = false);
        context.showToast('Failed to accept invitation', type: ToastType.error);
      }
    }
  }

  Future<void> _deleteCircle(String circleId) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('Delete Care Circle?', style: AppTypography.bodyBold(size: AppTypography.lg)),
        content: Text('This action cannot be undone. All members and data will be removed.', style: AppTypography.body()),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text('Cancel', style: AppTypography.bodyBold())),
          TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Delete', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold))),
        ],
      ),
    );

    if (confirm != true) return;

    setState(() => _loading = true);
    try {
      await _api.delete('/api/care-circles/$circleId');
      if (mounted) {
        context.showToast('Care circle deleted', type: ToastType.success);
        _load();
      }
    } catch (e) {
      print('Delete Circle Error: $e');
      if (mounted) {
        setState(() => _loading = false);
        context.showToast('Failed to delete circle', type: ToastType.error);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Care Circle'),
        backgroundColor: AppColors.background,
        actions: [
          IconButton(
            icon: const Icon(Icons.add, color: AppColors.primary),
            onPressed: () => _showCreateModal(context),
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
                  if (_invitations.isNotEmpty) ...[
                    Text('Pending Invitations',
                        style: AppTypography.bodyBold(size: AppTypography.md)),
                    const SizedBox(height: 12),
                    ..._invitations.map((inv) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: AppCard(
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(inv['circleName'] ?? 'Care Circle',
                                          style: AppTypography.bodySemiBold()),
                                      Text('Role: ${inv['role'] ?? 'Member'}',
                                          style: AppTypography.body(
                                              size: AppTypography.xs,
                                              color: AppColors.textMuted)),
                                    ],
                                  ),
                                ),
                                AppButton(
                                  label: 'Accept',
                                  onPressed: () => _acceptInvite(inv['id'].toString()),
                                ),
                              ],
                            ),
                          ),
                        )),
                    const SizedBox(height: 20),
                  ],

                  Text('Your Care Circles',
                      style: AppTypography.bodyBold(size: AppTypography.md)),
                  const SizedBox(height: 12),

                  if (_circles.isEmpty)
                    AppCard(
                      padding: const EdgeInsets.symmetric(vertical: 32),
                      child: Column(
                        children: [
                          const Text('👨‍👩‍👧‍👦', style: TextStyle(fontSize: 40)),
                          const SizedBox(height: 12),
                          Text('No Care Circles Yet',
                              style: AppTypography.bodyBold(size: AppTypography.lg)),
                          const SizedBox(height: 4),
                          Text('Create a care circle to get started',
                              style: AppTypography.body(
                                  size: AppTypography.sm, color: AppColors.textMuted)),
                          const SizedBox(height: 12),
                          AppButton(
                            label: 'Create Circle',
                            onPressed: () => _showCreateModal(context),
                          ),
                        ],
                      ),
                    )
                  else
                    ..._circles.map((circle) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: AppCard(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      width: 40,
                                      height: 40,
                                      decoration: BoxDecoration(
                                        color: AppColors.primaryFaint,
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      child: const Icon(Icons.people,
                                          color: AppColors.primary),
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(circle['name'] ?? 'Care Circle',
                                              style: AppTypography.bodySemiBold(
                                                  size: AppTypography.md)),
                                          Text(
                                              '${(circle['members'] as List?)?.length ?? 0} members',
                                              style: AppTypography.body(
                                                  size: AppTypography.xs,
                                                  color: AppColors.textMuted)),
                                        ],
                                      ),
                                    ),
                                    if (user?.id == circle['ownerId'])
                                      IconButton(
                                        icon: const Icon(Icons.delete_outline, color: Colors.red, size: 20),
                                        padding: EdgeInsets.zero,
                                        constraints: const BoxConstraints(),
                                        onPressed: () => _deleteCircle(circle['id'].toString()),
                                      ),
                                    const SizedBox(width: 12),
                                    GestureDetector(
                                      onTap: () => _showInviteModal(
                                          context, circle['id'].toString()),
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 12, vertical: 6),
                                        decoration: BoxDecoration(
                                          color: AppColors.primaryFaint,
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Text('Invite',
                                            style: AppTypography.bodySemiBold(
                                                size: AppTypography.xs,
                                                color: AppColors.primary)),
                                      ),
                                    ),
                                  ],
                                ),
                                if ((circle['members'] as List?)?.isNotEmpty ?? false) ...[
                                  const SizedBox(height: 12),
                                  const Divider(color: AppColors.surfaceBorder),
                                  ...(circle['members'] as List).map((member) => Padding(
                                        padding: const EdgeInsets.symmetric(vertical: 4),
                                        child: Row(
                                          children: [
                                            Container(
                                              width: 28,
                                              height: 28,
                                              decoration: BoxDecoration(
                                                color: AppColors.surfaceElevated,
                                                shape: BoxShape.circle,
                                              ),
                                              child: Center(
                                                child: Text(
                                                  '${(member['user']?['firstName'] ?? '?')[0]}',
                                                  style: const TextStyle(
                                                      fontSize: 12,
                                                      color: AppColors.textSecondary),
                                                ),
                                              ),
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Text(
                                                '${member['user']?['firstName'] ?? ''} ${member['user']?['lastName'] ?? ''}',
                                                style: AppTypography.body(
                                                    size: AppTypography.sm),
                                              ),
                                            ),
                                            AppBadge(
                                              label: member['role']?['name'] ?? 'Member',
                                              variant: BadgeVariant.primary,
                                            ),
                                          ],
                                        ),
                                      )),
                                ],
                              ],
                            ),
                          ),
                        )),
                ],
              ),
            ),
    );
  }

  void _showCreateModal(BuildContext context) {
    bool patientCoOwn = true;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(
            AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Create Care Circle',
                  style: AppTypography.bodyBold(size: AppTypography.lg)),
              const SizedBox(height: 16),
              AppInput(
                label: 'Circle Name',
                placeholder: "e.g., Mom's Care Team",
                controller: _circleNameCtrl,
                icon: Icons.people_outline,
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Checkbox(
                    value: patientCoOwn,
                    activeColor: AppColors.primary,
                    onChanged: (val) {
                      if (val != null) setModalState(() => patientCoOwn = val);
                    },
                  ),
                  Expanded(
                    child: Text('Patient Co-Owns this Circle',
                        style: AppTypography.bodySemiBold(size: AppTypography.sm)),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              AppButton(
                label: 'Create',
                onPressed: () => _createCircle(ctx, setModalState, patientCoOwn: patientCoOwn),
                loading: _createLoading,
                disabled: _createLoading,
                fullWidth: true,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showInviteModal(BuildContext context, String circleId) {
    String selectedRole = 'CAREGIVER_FULL';
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(
            AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text('Invite Member',
                  style: AppTypography.bodyBold(size: AppTypography.lg), textAlign: TextAlign.center),
              const SizedBox(height: 16),
              AppInput(
                label: 'Email Address',
                placeholder: 'caregiver@email.com',
                controller: _inviteEmailCtrl,
                icon: Icons.mail_outline,
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 12),
              Text('Role', style: AppTypography.bodySemiBold(size: AppTypography.sm)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.surfaceBorder),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: selectedRole,
                    isExpanded: true,
                    dropdownColor: AppColors.surface,
                    items: const [
                      DropdownMenuItem(value: 'CAREGIVER_FULL', child: Text('Full Caregiver')),
                      DropdownMenuItem(value: 'CAREGIVER_VIEW', child: Text('View-Only Caregiver')),
                      DropdownMenuItem(value: 'PROFESSIONAL', child: Text('Professional Caregiver')),
                      DropdownMenuItem(value: 'PHYSICIAN', child: Text('Physician')),
                    ],
                    onChanged: (val) {
                      if (val != null) {
                        setModalState(() => selectedRole = val);
                      }
                    },
                  ),
                ),
              ),
              const SizedBox(height: 24),
              AppButton(
                label: 'Send Invitation',
                onPressed: () => _sendInvite(ctx, setModalState, circleId, selectedRole),
                loading: _inviteLoading,
                disabled: _inviteLoading,
                fullWidth: true,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
