// lib/core/theme.dart
// SilverCare Design System — colors, typography, spacing, shadows, ThemeData
// Ported from React Native theme.ts

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ── Colors ──────────────────────────────────────────────────────────────────────
class AppColors {
  AppColors._();

  // Backgrounds
  static const Color background = Color(0xFF0B1120);
  static const Color surface = Color(0xFF111827);
  static const Color surfaceElevated = Color(0xFF1F2937);
  static const Color surfaceBorder = Color(0xFF374151);

  // Primary — teal-emerald
  static const Color primary = Color(0xFF14B8A6);
  static const Color primaryLight = Color(0xFF2DD4BF);
  static const Color primaryDark = Color(0xFF0F9488);
  static Color primaryFaint = const Color(0xFF14B8A6).withValues(alpha: 0.12);

  // Accent — violet
  static const Color accent = Color(0xFF8B5CF6);
  static Color accentFaint = const Color(0xFF8B5CF6).withValues(alpha: 0.12);

  // Semantic
  static const Color danger = Color(0xFFF43F5E);
  static Color dangerFaint = const Color(0xFFF43F5E).withValues(alpha: 0.12);
  static const Color warning = Color(0xFFF59E0B);
  static Color warningFaint = const Color(0xFFF59E0B).withValues(alpha: 0.12);
  static const Color success = Color(0xFF10B981);
  static Color successFaint = const Color(0xFF10B981).withValues(alpha: 0.12);
  static const Color info = Color(0xFF3B82F6);
  static Color infoFaint = const Color(0xFF3B82F6).withValues(alpha: 0.12);

  // Text
  static const Color textPrimary = Color(0xFFF9FAFB);
  static const Color textSecondary = Color(0xFF9CA3AF);
  static const Color textMuted = Color(0xFF6B7280);
  static const Color textInverse = Color(0xFF0B1120);

  // SOS
  static const Color sos = Color(0xFFEF4444);
  static const Color sosDark = Color(0xFFDC2626);
}

// ── Typography ──────────────────────────────────────────────────────────────────
class AppTypography {
  AppTypography._();

  static const double xs = 11;
  static const double sm = 13;
  static const double base = 15;
  static const double md = 17;
  static const double lg = 20;
  static const double xl = 24;
  static const double xxl = 28;
  static const double xxxl = 34;
  static const double xxxxl = 42;

  static TextStyle heading({double size = xxl, Color color = AppColors.textPrimary}) {
    return GoogleFonts.outfit(
      fontSize: size,
      fontWeight: FontWeight.w700,
      color: color,
    );
  }

  static TextStyle body({
    double size = base,
    FontWeight weight = FontWeight.w400,
    Color color = AppColors.textPrimary,
  }) {
    return GoogleFonts.inter(
      fontSize: size,
      fontWeight: weight,
      color: color,
    );
  }

  static TextStyle bodyMedium({double size = base, Color color = AppColors.textPrimary}) {
    return body(size: size, weight: FontWeight.w500, color: color);
  }

  static TextStyle bodySemiBold({double size = base, Color color = AppColors.textPrimary}) {
    return body(size: size, weight: FontWeight.w600, color: color);
  }

  static TextStyle bodyBold({double size = base, Color color = AppColors.textPrimary}) {
    return body(size: size, weight: FontWeight.w700, color: color);
  }
}

// ── Spacing ─────────────────────────────────────────────────────────────────────
class AppSpacing {
  AppSpacing._();

  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double base = 16;
  static const double lg = 20;
  static const double xl = 24;
  static const double xxl = 32;
  static const double xxxl = 48;
}

// ── Radius ──────────────────────────────────────────────────────────────────────
class AppRadius {
  AppRadius._();

  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double full = 9999;
}

// ── Shadows ─────────────────────────────────────────────────────────────────────
class AppShadow {
  AppShadow._();

  static List<BoxShadow> sm = [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.15),
      offset: const Offset(0, 2),
      blurRadius: 4,
    ),
  ];

  static List<BoxShadow> md = [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.25),
      offset: const Offset(0, 4),
      blurRadius: 8,
    ),
  ];

  static List<BoxShadow> glow(Color color) => [
    BoxShadow(
      color: color.withValues(alpha: 0.5),
      offset: Offset.zero,
      blurRadius: 12,
    ),
  ];
}

// ── ThemeData ────────────────────────────────────────────────────────────────────
class AppTheme {
  AppTheme._();

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        secondary: AppColors.accent,
        surface: AppColors.surface,
        error: AppColors.danger,
        onPrimary: AppColors.textInverse,
        onSecondary: AppColors.textPrimary,
        onSurface: AppColors.textPrimary,
        onError: Colors.white,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.background,
        elevation: 0,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: AppTypography.xl,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
        ),
        iconTheme: const IconThemeData(color: AppColors.textPrimary),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.surface,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      textTheme: TextTheme(
        headlineLarge: GoogleFonts.outfit(
          fontSize: AppTypography.xxxl,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
        ),
        headlineMedium: GoogleFonts.outfit(
          fontSize: AppTypography.xxl,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
        ),
        titleLarge: GoogleFonts.inter(
          fontSize: AppTypography.xl,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
        ),
        titleMedium: GoogleFonts.inter(
          fontSize: AppTypography.md,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: AppTypography.base,
          fontWeight: FontWeight.w400,
          color: AppColors.textPrimary,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: AppTypography.sm,
          fontWeight: FontWeight.w400,
          color: AppColors.textSecondary,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: AppTypography.xs,
          fontWeight: FontWeight.w400,
          color: AppColors.textMuted,
        ),
      ),
    );
  }
}
