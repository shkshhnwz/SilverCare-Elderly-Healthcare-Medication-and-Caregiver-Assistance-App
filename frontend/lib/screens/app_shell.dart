// lib/screens/app_shell.dart
// Bottom navigation shell — 5 tabs matching the React Native layout

import 'package:flutter/material.dart';
import '../core/theme.dart';
import 'tabs/dashboard_screen.dart';
import 'tabs/medications_screen.dart';
import 'tabs/vitals_screen.dart';
import 'tabs/emergency_screen.dart';
import 'tabs/more_screen.dart';

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _currentIndex = 0;

  final _screens = const [
    DashboardScreen(),
    MedicationsScreen(),
    VitalsScreen(),
    EmergencyScreen(),
    MoreScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          border: Border(
            top: BorderSide(color: AppColors.surfaceBorder, width: 0.5),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          backgroundColor: AppColors.surface,
          selectedItemColor: AppColors.primary,
          unselectedItemColor: AppColors.textMuted,
          type: BottomNavigationBarType.fixed,
          selectedFontSize: 11,
          unselectedFontSize: 11,
          selectedLabelStyle: AppTypography.bodySemiBold(size: 11, color: AppColors.primary),
          unselectedLabelStyle: AppTypography.body(size: 11, color: AppColors.textMuted),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard_outlined),
              activeIcon: Icon(Icons.dashboard),
              label: 'Dashboard',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.medical_services_outlined),
              activeIcon: Icon(Icons.medical_services),
              label: 'Medications',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.favorite_outline),
              activeIcon: Icon(Icons.favorite),
              label: 'Vitals',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.error_outline),
              activeIcon: Icon(Icons.error),
              label: 'Emergency',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.more_horiz),
              activeIcon: Icon(Icons.more_horiz),
              label: 'More',
            ),
          ],
        ),
      ),
    );
  }
}
