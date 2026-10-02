# SilverCare — Brand Identity & Design System Specification (2026)

> **Brand Meaning:** CARE + SAFETY + TRUST + HUMAN CONNECTION  
> **Core Metaphors:** Protective Shield + Heart + Two Connected Humans (Caregiver & Senior)  
> **Color Direction:** Deep Teal (`#0C4A52`), Soft Mint (`#14B8A6` / `#2DD4BF`), Warm Neutral (`#F8FAF9`)

---

## 1. Symbol Concept & Geometry

The **SilverCare** mark replaces generic hospital crosses and clichéd stock imagery with an abstract, high-end geometric emblem:

- **Caregiver / Guardian (Left Figure, Deep Teal):**  
  Taller protective arch curving over and down with a firm shoulder, symbolizing clinical oversight, guardianship, and professional responsibility.
- **Senior / Loved One (Right Figure, Soft Mint):**  
  Nestled comfortably in the curve, looking inward with a gentle posture, symbolizing comfort, dignity, and calm reassurance in golden years.
- **The Protective Shield:**  
  The unified outer contour sweeps into an organic shield silhouette, conveying physical and digital safety.
- **The Negative-Space Heart:**  
  The optical channel between both leaning figures forms an upward heart, putting empathy and genuine connection at the foundation of the technology.

---

## 2. Deliverables Summary

| Asset | Format | Light Mode | Dark Mode | Monochrome |
| :--- | :--- | :--- | :--- | :--- |
| **1. Symbol** | SVG | [Symbol Light](file:///brand/assets/silvercare-symbol.svg) | [Symbol Dark](file:///brand/assets/silvercare-symbol-dark.svg) | [Mono Black](file:///brand/assets/silvercare-symbol-monochrome-black.svg) · [Mono White](file:///brand/assets/silvercare-symbol-monochrome-white.svg) |
| **2. Wordmark** | SVG | [Wordmark Light](file:///brand/assets/silvercare-wordmark.svg) | [Wordmark Dark](file:///brand/assets/silvercare-wordmark-dark.svg) | [Mono Black](file:///brand/assets/silvercare-wordmark-monochrome-black.svg) · [Mono White](file:///brand/assets/silvercare-wordmark-monochrome-white.svg) |
| **3. Horizontal Logo** | SVG | [Horizontal Light](file:///brand/assets/silvercare-logo-horizontal.svg) | [Horizontal Dark](file:///brand/assets/silvercare-logo-horizontal-dark.svg) | [Mono Black](file:///brand/assets/silvercare-logo-horizontal-monochrome-black.svg) · [Mono White](file:///brand/assets/silvercare-logo-horizontal-monochrome-white.svg) |
| **4. Stacked Logo** | SVG | [Stacked Light](file:///brand/assets/silvercare-logo-stacked.svg) | [Stacked Dark](file:///brand/assets/silvercare-logo-stacked-dark.svg) | [Mono Black](file:///brand/assets/silvercare-logo-stacked-monochrome-black.svg) · [Mono White](file:///brand/assets/silvercare-logo-stacked-monochrome-white.svg) |
| **5. App Icon** | SVG & PNG | [App Icon Squircle (512x512)](file:///brand/assets/silvercare-app-icon.svg) | [Adaptive Square](file:///brand/assets/silvercare-app-icon-square.svg) | PNGs: [1024x1024](file:///brand/assets/silvercare-app-icon-1024x1024.png), [512x512](file:///brand/assets/silvercare-app-icon-512x512.png), [192x192](file:///brand/assets/silvercare-app-icon-192x192.png) |
| **6. Light Background** | SVG | [Full Light Presentation](file:///brand/assets/silvercare-logo-light.svg) | Warm Neutral `#F8FAF9` | Crisp `#FFFFFF` |
| **7. Dark Background** | SVG | [Full Dark Presentation](file:///brand/assets/silvercare-logo-dark.svg) | Obsidian Slate `#0B1215` | Deep Obsidian `#08262C` |
| **8. Monochrome** | SVG | Black on White (`#000000`) | White on Dark (`#FFFFFF`) | Verified at 1-bit reproduction |

---

## 3. Micro-Scale Legibility (24px & 48px)

The symbol geometry was optimized using calibrated optical channels (4.5px negative space gap in 100px master):
- **24px (Mobile App Bar / Browser Favicon):** Zero blurring or path collision. The two heads and dual embrace remain razor sharp.
- **48px (Notification & Card Avatars):** Distinct separation between caregiver and senior figures with clear heart silhouette.

---

## 4. Mobile Operating System Assets

Android launcher mipmaps have been replaced with the official SilverCare icon:
- `frontend/android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `frontend/android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `frontend/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `frontend/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `frontend/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

Native Flutter widget available at:
`frontend/lib/widgets/silvercare_logo.dart`

Interactive Showcase Portal:
Open [brand/index.html](file:///brand/index.html) in any browser to inspect full responsive vector scale rendering and copy assets.
