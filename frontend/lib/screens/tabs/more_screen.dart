// lib/screens/tabs/more_screen.dart
// More / Grid screen — links to all remaining feature screens
// Ported from more.tsx

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';

class _MenuItem {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final String route;
  _MenuItem(this.title, this.subtitle, this.icon, this.color, this.route);
}

final _menuItems = [
  _MenuItem('Care Circle', 'Manage members & invitations', Icons.people, AppColors.primary, '/care-circle'),
  _MenuItem('Location Safety', 'Safe zones & geofencing', Icons.location_on, AppColors.accent, '/location'),
  _MenuItem('Care Plan', 'Tasks & shift management', Icons.assignment, AppColors.success, '/care-plan'),
  _MenuItem('Appointments', 'Schedule & post-notes', Icons.calendar_today, AppColors.info, '/appointments'),
  _MenuItem('Communication', 'Activity feed & care chat', Icons.chat_bubble, AppColors.warning, '/communication'),
  _MenuItem('Reports', 'Physician & caregiver reports', Icons.bar_chart, AppColors.danger, '/reports'),
  _MenuItem('Settings', 'Profile & accessibility', Icons.settings, AppColors.textMuted, '/settings'),
];

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    final auth = context.read<AuthProvider>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.base, vertical: 12),
              child: Text('More',
                  style: AppTypography.bodyBold(size: AppTypography.xl)),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.base),
                children: [
                  // Profile card
                  Container(
                    padding: const EdgeInsets.all(16),
                    margin: const EdgeInsets.only(bottom: 20),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.surfaceBorder),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 52,
                          height: 52,
                          decoration: BoxDecoration(
                            color: AppColors.primaryFaint,
                            shape: BoxShape.circle,
                            border:
                                Border.all(color: AppColors.primary, width: 2),
                          ),
                          child: Center(
                            child: Text(user?.initials ?? '',
                                style: AppTypography.bodyBold(
                                    size: AppTypography.lg,
                                    color: AppColors.primary)),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                  '${user?.firstName ?? ''} ${user?.lastName ?? ''}',
                                  style: AppTypography.bodyBold(
                                      size: AppTypography.md)),
                              const SizedBox(height: 2),
                              Text(
                                  user?.email ??
                                      user?.phone ??
                                      'SilverCare User',
                                  style: AppTypography.body(
                                      size: AppTypography.sm,
                                      color: AppColors.textMuted)),
                            ],
                          ),
                        ),
                        GestureDetector(
                          onTap: () =>
                              Navigator.of(context).pushNamed('/settings'),
                          child: Container(
                            width: 34,
                            height: 34,
                            decoration: BoxDecoration(
                              color: AppColors.primaryFaint,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(Icons.edit_outlined,
                                size: 16, color: AppColors.primary),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Menu items
                  ..._menuItems.map((item) => Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: GestureDetector(
                          onTap: () =>
                              Navigator.of(context).pushNamed(item.route),
                          child: Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: AppColors.surface,
                              borderRadius: BorderRadius.circular(14),
                              border:
                                  Border.all(color: AppColors.surfaceBorder),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 44,
                                  height: 44,
                                  decoration: BoxDecoration(
                                    color: item.color.withValues(alpha: 0.13),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Icon(item.icon,
                                      size: 22, color: item.color),
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(item.title,
                                          style: AppTypography.bodySemiBold()),
                                      const SizedBox(height: 2),
                                      Text(item.subtitle,
                                          style: AppTypography.body(
                                              size: AppTypography.xs,
                                              color: AppColors.textMuted)),
                                    ],
                                  ),
                                ),
                                const Icon(Icons.chevron_right,
                                    size: 18, color: AppColors.textMuted),
                              ],
                            ),
                          ),
                        ),
                      )),

                  // Logout
                  GestureDetector(
                    onTap: () async {
                      await auth.logout();
                      if (context.mounted) {
                        Navigator.of(context).pushReplacementNamed('/login');
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      margin: const EdgeInsets.only(top: 10),
                      decoration: BoxDecoration(
                        color: AppColors.dangerFaint,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                            color: AppColors.danger.withValues(alpha: 0.25)),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.logout,
                              size: 20, color: AppColors.danger),
                          const SizedBox(width: 10),
                          Text('Sign Out',
                              style: AppTypography.bodySemiBold(
                                  color: AppColors.danger)),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
