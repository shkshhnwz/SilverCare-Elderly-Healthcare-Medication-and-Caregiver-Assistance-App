// lib/widgets/app_input.dart
// Styled text field with label, icon, error — ported from Input.tsx

import 'package:flutter/material.dart';
import '../core/theme.dart';

class AppInput extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? error;
  final IconData? icon;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;
  final bool obscureText;
  final bool secureToggle;
  final TextCapitalization textCapitalization;

  const AppInput({
    super.key,
    this.label,
    this.placeholder,
    this.error,
    this.icon,
    this.controller,
    this.onChanged,
    this.keyboardType,
    this.obscureText = false,
    this.secureToggle = false,
    this.textCapitalization = TextCapitalization.none,
  });

  @override
  State<AppInput> createState() => _AppInputState();
}

class _AppInputState extends State<AppInput> {
  late bool _obscure;

  @override
  void initState() {
    super.initState();
    _obscure = widget.obscureText;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.label != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Text(
                widget.label!,
                style: AppTypography.bodyMedium(
                  size: AppTypography.sm,
                  color: AppColors.textSecondary,
                ),
              ),
            ),
          Container(
            height: 50,
            decoration: BoxDecoration(
              color: AppColors.surfaceElevated,
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(
                color: widget.error != null ? AppColors.danger : AppColors.surfaceBorder,
              ),
            ),
            child: Row(
              children: [
                if (widget.icon != null)
                  Padding(
                    padding: const EdgeInsets.only(left: 14),
                    child: Icon(widget.icon, size: 18, color: AppColors.textMuted),
                  ),
                Expanded(
                  child: TextField(
                    controller: widget.controller,
                    onChanged: widget.onChanged,
                    keyboardType: widget.keyboardType,
                    obscureText: _obscure,
                    textCapitalization: widget.textCapitalization,
                    style: AppTypography.body(size: AppTypography.base, color: AppColors.textPrimary),
                    decoration: InputDecoration(
                      hintText: widget.placeholder,
                      hintStyle: AppTypography.body(size: AppTypography.base, color: AppColors.textMuted),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.only(
                        left: widget.icon != null ? 8 : 14,
                        right: 14,
                      ),
                    ),
                  ),
                ),
                if (widget.secureToggle)
                  GestureDetector(
                    onTap: () => setState(() => _obscure = !_obscure),
                    child: Padding(
                      padding: const EdgeInsets.only(right: 14),
                      child: Icon(
                        _obscure ? Icons.visibility_off : Icons.visibility,
                        size: 18,
                        color: AppColors.textMuted,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          if (widget.error != null)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                widget.error!,
                style: AppTypography.body(size: AppTypography.xs, color: AppColors.danger),
              ),
            ),
        ],
      ),
    );
  }
}
