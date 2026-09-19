// lib/screens/more/settings_screen.dart
// Settings — Profile & Accessibility (PRD 6.10)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_toast.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Settings'), backgroundColor: AppColors.background),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.base),
        children: [
          // Profile section
          AppCard(
            child: Column(
              children: [
                Container(
                  width: 72, height: 72,
                  decoration: BoxDecoration(
                    color: AppColors.primaryFaint,
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.primary, width: 2),
                  ),
                  child: Center(child: Text(user?.initials ?? '',
                      style: AppTypography.bodyBold(size: AppTypography.xl, color: AppColors.primary))),
                ),
                const SizedBox(height: 12),
                Text('${user?.firstName ?? ''} ${user?.lastName ?? ''}',
                    style: AppTypography.bodyBold(size: AppTypography.lg)),
                const SizedBox(height: 2),
                Text(user?.email ?? user?.phone ?? '',
                    style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
              ],
            ),
          ),
          const SizedBox(height: 20),

          Text('Accessibility', style: AppTypography.bodyBold(size: AppTypography.md)),
          const SizedBox(height: 12),

          _settingItem(context, Icons.text_fields, 'Large Text Mode',
              'Increase font sizes throughout the app', AppColors.primary),
          _settingItem(context, Icons.contrast, 'High Contrast',
              'Enhanced color contrast for readability', AppColors.warning),
          _settingItem(context, Icons.record_voice_over, 'Voice Reminders',
              'TTS-powered medication reminders', AppColors.info),
          _settingItem(context, Icons.phone_android, 'Assisted Setup',
              'Let a family member configure your device', AppColors.success),

          const SizedBox(height: 20),
          Text('Notifications', style: AppTypography.bodyBold(size: AppTypography.md)),
          const SizedBox(height: 12),

          _settingItem(context, Icons.notifications_active, 'Push Notifications',
              'Receive alerts for medications and emergencies', AppColors.danger),
          _settingItem(context, Icons.sms, 'SMS Fallback',
              'Send SMS when push notifications fail', AppColors.accent),

          const SizedBox(height: 20),
          Text('Account', style: AppTypography.bodyBold(size: AppTypography.md)),
          const SizedBox(height: 12),

          _settingItem(context, Icons.download, 'Export Data',
              'Download your health data', AppColors.info),
          _settingItem(context, Icons.delete_outline, 'Delete Account',
              'Permanently delete your account and data', AppColors.danger),
        ],
      ),
    );
  }

  Widget _settingItem(BuildContext context, IconData icon, String title, String subtitle, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: AppCard(
        onTap: () => context.showToast('$title — coming soon', type: ToastType.info),
        child: Row(
          children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.13),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, size: 20, color: color),
            ),
            const SizedBox(width: 14),
            Expanded(child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: AppTypography.bodySemiBold()),
                const SizedBox(height: 2),
                Text(subtitle, style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
              ],
            )),
            const Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
          ],
        ),
      ),
    );
  }
}
