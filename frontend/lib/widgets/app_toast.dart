// lib/widgets/app_toast.dart
// Overlay toast notification system — ported from Toast.tsx

import 'dart:async';
import 'package:flutter/material.dart';
import '../core/theme.dart';

enum ToastType { success, error, warning, info }

class ToastService {
  static final ToastService _instance = ToastService._internal();
  factory ToastService() => _instance;
  ToastService._internal();

  OverlayEntry? _currentEntry;
  Timer? _timer;

  static const _icons = {
    ToastType.success: Icons.check_circle,
    ToastType.error: Icons.cancel,
    ToastType.warning: Icons.warning,
    ToastType.info: Icons.info,
  };

  static const _colors = {
    ToastType.success: AppColors.success,
    ToastType.error: AppColors.danger,
    ToastType.warning: AppColors.warning,
    ToastType.info: AppColors.info,
  };

  void show(BuildContext context, String message, {ToastType type = ToastType.info}) {
    dismiss();

    final overlay = Overlay.of(context);
    final color = _colors[type]!;
    final icon = _icons[type]!;

    _currentEntry = OverlayEntry(
      builder: (context) => Positioned(
        bottom: 90,
        left: 16,
        right: 16,
        child: Material(
          color: Colors.transparent,
          child: _ToastWidget(message: message, color: color, icon: icon),
        ),
      ),
    );

    overlay.insert(_currentEntry!);
    _timer = Timer(const Duration(seconds: 3), dismiss);
  }

  void dismiss() {
    _timer?.cancel();
    _currentEntry?.remove();
    _currentEntry = null;
  }
}

class _ToastWidget extends StatelessWidget {
  final String message;
  final Color color;
  final IconData icon;

  const _ToastWidget({
    required this.message,
    required this.color,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border(left: BorderSide(color: color, width: 4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            offset: const Offset(0, 4),
            blurRadius: 8,
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(icon, size: 18, color: color),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              message,
              style: AppTypography.body(size: 14, color: AppColors.textPrimary),
            ),
          ),
        ],
      ),
    );
  }
}

/// Extension for easy toast access from BuildContext
extension ToastExtension on BuildContext {
  void showToast(String message, {ToastType type = ToastType.info}) {
    ToastService().show(this, message, type: type);
  }
}
