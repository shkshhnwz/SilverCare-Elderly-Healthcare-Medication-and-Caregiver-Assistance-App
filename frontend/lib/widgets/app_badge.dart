// lib/widgets/app_badge.dart
// Status badge — ported from Badge.tsx

import 'package:flutter/material.dart';
import '../core/theme.dart';

enum BadgeVariant { success, danger, warning, info, primary, muted }

class AppBadge extends StatelessWidget {
  final String label;
  final BadgeVariant variant;

  const AppBadge({
    super.key,
    required this.label,
    this.variant = BadgeVariant.primary,
  });

  @override
  Widget build(BuildContext context) {
    final config = _variantConfig;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: config.bg,
        borderRadius: BorderRadius.circular(AppRadius.full),
      ),
      child: Text(
        label.toUpperCase(),
        style: AppTypography.bodySemiBold(
          size: 11,
          color: config.text,
        ).copyWith(letterSpacing: 0.5),
      ),
    );
  }

  _BadgeConfig get _variantConfig {
    switch (variant) {
      case BadgeVariant.success:
        return _BadgeConfig(AppColors.successFaint, AppColors.success);
      case BadgeVariant.danger:
        return _BadgeConfig(AppColors.dangerFaint, AppColors.danger);
      case BadgeVariant.warning:
        return _BadgeConfig(AppColors.warningFaint, AppColors.warning);
      case BadgeVariant.info:
        return _BadgeConfig(AppColors.infoFaint, AppColors.info);
      case BadgeVariant.primary:
        return _BadgeConfig(AppColors.primaryFaint, AppColors.primary);
      case BadgeVariant.muted:
        return _BadgeConfig(AppColors.surfaceElevated, AppColors.textMuted);
    }
  }
}

class _BadgeConfig {
  final Color bg;
  final Color text;
  _BadgeConfig(this.bg, this.text);
}
