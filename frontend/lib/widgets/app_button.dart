// lib/widgets/app_button.dart
// Multi-variant button — ported from Button.tsx

import 'package:flutter/material.dart';
import '../core/theme.dart';

enum AppButtonVariant { primary, secondary, danger, ghost, warning }

class AppButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final AppButtonVariant variant;
  final bool loading;
  final bool disabled;
  final bool fullWidth;
  final EdgeInsetsGeometry? margin;

  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.loading = false,
    this.disabled = false,
    this.fullWidth = false,
    this.margin,
  });

  @override
  Widget build(BuildContext context) {
    final config = _variantConfig;

    return Padding(
      padding: margin ?? EdgeInsets.zero,
      child: SizedBox(
        width: fullWidth ? double.infinity : null,
        height: 50,
        child: Opacity(
          opacity: (disabled || loading) ? 0.5 : 1.0,
          child: OutlinedButton(
            onPressed: (disabled || loading) ? null : onPressed,
            style: OutlinedButton.styleFrom(
              backgroundColor: config.bg,
              side: BorderSide(color: config.border),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppRadius.md),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24),
            ),
            child: loading
                ? SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: config.text,
                    ),
                  )
                : Text(
                    label,
                    style: AppTypography.bodySemiBold(
                      size: AppTypography.base,
                      color: config.text,
                    ).copyWith(letterSpacing: 0.3),
                  ),
          ),
        ),
      ),
    );
  }

  _VariantConfig get _variantConfig {
    switch (variant) {
      case AppButtonVariant.primary:
        return _VariantConfig(AppColors.primary, AppColors.textInverse, AppColors.primary);
      case AppButtonVariant.secondary:
        return _VariantConfig(AppColors.surfaceElevated, AppColors.textPrimary, AppColors.surfaceBorder);
      case AppButtonVariant.danger:
        return _VariantConfig(AppColors.danger, Colors.white, AppColors.danger);
      case AppButtonVariant.ghost:
        return _VariantConfig(Colors.transparent, AppColors.primary, AppColors.primary);
      case AppButtonVariant.warning:
        return _VariantConfig(AppColors.warning, AppColors.textInverse, AppColors.warning);
    }
  }
}

class _VariantConfig {
  final Color bg;
  final Color text;
  final Color border;
  _VariantConfig(this.bg, this.text, this.border);
}
