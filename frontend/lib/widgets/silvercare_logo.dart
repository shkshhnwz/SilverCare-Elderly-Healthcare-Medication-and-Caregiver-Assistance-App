// lib/widgets/silvercare_logo.dart
// Native Flutter Vector Symbol and Wordmark for SilverCare
// Provides zero-dependency, pixel-perfect rendering across all screen densities.

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// SilverCare Vector Symbol Painter
/// Draws the two connected caring figures (caregiver & senior forming heart-shield)
class SilverCareSymbolPainter extends CustomPainter {
  final Color caregiverColor;
  final Color seniorColor;

  const SilverCareSymbolPainter({
    this.caregiverColor = const Color(0xFF0C4A52),
    this.seniorColor = const Color(0xFF14B8A6),
  });

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 100.0;
    final scaleY = size.height / 100.0;

    final paintCaregiver = Paint()
      ..color = caregiverColor
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    final paintSenior = Paint()
      ..color = seniorColor
      ..style = PaintingStyle.fill
      ..isAntiAlias = true;

    // 1. Caregiver Head: cx=36, cy=17, r=7.5
    canvas.drawCircle(
      Offset(36 * scale, 17 * scaleY),
      7.5 * scale,
      paintCaregiver,
    );

    // 2. Caregiver Body
    // M 36 28 C 24 28, 16 41, 16 57 C 16 73, 30 85, 48 90 C 44 82, 34 73, 34 59 C 34 45, 41 37, 49 33 C 45 29, 40 28, 36 28 Z
    final cgPath = Path()
      ..moveTo(36 * scale, 28 * scaleY)
      ..cubicTo(24 * scale, 28 * scaleY, 16 * scale, 41 * scaleY, 16 * scale, 57 * scaleY)
      ..cubicTo(16 * scale, 73 * scaleY, 30 * scale, 85 * scaleY, 48 * scale, 90 * scaleY)
      ..cubicTo(44 * scale, 82 * scaleY, 34 * scale, 73 * scaleY, 34 * scale, 59 * scaleY)
      ..cubicTo(34 * scale, 45 * scaleY, 41 * scale, 37 * scaleY, 49 * scale, 33 * scaleY)
      ..cubicTo(45 * scale, 29 * scaleY, 40 * scale, 28 * scaleY, 36 * scale, 28 * scaleY)
      ..close();
    canvas.drawPath(cgPath, paintCaregiver);

    // 3. Senior Head: cx=64, cy=21, r=6.5
    canvas.drawCircle(
      Offset(64 * scale, 21 * scaleY),
      6.5 * scale,
      paintSenior,
    );

    // 4. Senior Body
    // M 64 31 C 56 31, 49 38, 49 48 C 48 59, 54 70, 52 90 C 68 84, 84 71, 84 54 C 84 40, 74 31, 64 31 Z
    final snPath = Path()
      ..moveTo(64 * scale, 31 * scaleY)
      ..cubicTo(56 * scale, 31 * scaleY, 49 * scale, 38 * scaleY, 49 * scale, 48 * scaleY)
      ..cubicTo(48 * scale, 59 * scaleY, 54 * scale, 70 * scaleY, 52 * scale, 90 * scaleY)
      ..cubicTo(68 * scale, 84 * scaleY, 84 * scale, 71 * scaleY, 84 * scale, 54 * scaleY)
      ..cubicTo(84 * scale, 40 * scaleY, 74 * scale, 31 * scaleY, 64 * scale, 31 * scaleY)
      ..close();
    canvas.drawPath(snPath, paintSenior);
  }

  @override
  bool shouldRepaint(covariant SilverCareSymbolPainter oldDelegate) {
    return oldDelegate.caregiverColor != caregiverColor || oldDelegate.seniorColor != seniorColor;
  }
}

/// Standalone Symbol Widget
class SilverCareSymbol extends StatelessWidget {
  final double size;
  final bool isDark;
  final bool isMonochrome;
  final Color? customCaregiverColor;
  final Color? customSeniorColor;

  const SilverCareSymbol({
    super.key,
    this.size = 48.0,
    this.isDark = false,
    this.isMonochrome = false,
    this.customCaregiverColor,
    this.customSeniorColor,
  });

  @override
  Widget build(BuildContext context) {
    Color cgColor;
    Color snColor;

    if (isMonochrome) {
      cgColor = isDark ? Colors.white : Colors.black;
      snColor = cgColor;
    } else {
      cgColor = customCaregiverColor ?? (isDark ? Colors.white : const Color(0xFF0C4A52));
      snColor = customSeniorColor ?? (isDark ? const Color(0xFF2DD4BF) : const Color(0xFF14B8A6));
    }

    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: SilverCareSymbolPainter(
          caregiverColor: cgColor,
          seniorColor: snColor,
        ),
      ),
    );
  }
}

/// Full Horizontal Logo Lockup Widget
class SilverCareHorizontalLogo extends StatelessWidget {
  final double height;
  final bool isDark;
  final bool showTagline;

  const SilverCareHorizontalLogo({
    super.key,
    this.height = 40.0,
    this.isDark = false,
    this.showTagline = false,
  });

  @override
  Widget build(BuildContext context) {
    final textColor = isDark ? const Color(0xFFF8FAF9) : const Color(0xFF0C4A52);
    final accentColor = isDark ? const Color(0xFF2DD4BF) : const Color(0xFF14B8A6);

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SilverCareSymbol(
          size: height,
          isDark: isDark,
        ),
        SizedBox(width: height * 0.28),
        Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RichText(
              text: TextSpan(
                style: GoogleFonts.plusJakartaSans(
                  fontSize: height * 0.58,
                  letterSpacing: -0.5,
                ),
                children: [
                  TextSpan(
                    text: 'Silver',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: textColor,
                    ),
                  ),
                  TextSpan(
                    text: 'Care',
                    style: TextStyle(
                      fontWeight: FontWeight.w800,
                      color: accentColor,
                    ),
                  ),
                ],
              ),
            ),
            if (showTagline) ...[
              SizedBox(height: height * 0.04),
              Text(
                'ELDERCARE & CAREGIVER PLATFORM',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: height * 0.18,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 1.2,
                  color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                ),
              ),
            ],
          ],
        ),
      ],
    );
  }
}
