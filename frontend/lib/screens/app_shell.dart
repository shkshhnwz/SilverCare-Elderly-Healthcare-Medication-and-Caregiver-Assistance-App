// lib/screens/app_shell.dart
// Bottom navigation shell — 5 tabs matching the React Native layout

import 'package:flutter/material.dart';
import '../core/theme.dart';
import '../core/socket_service.dart';
import '../core/location_service.dart';
import '../core/notification_service.dart';
import '../core/api_client.dart';
import '../widgets/app_toast.dart';
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
  final SocketService _socket = SocketService();

  final _screens = const [
    DashboardScreen(),
    MedicationsScreen(),
    VitalsScreen(),
    EmergencyScreen(),
    MoreScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _socket.on('emergency_triggered', _handleEmergencyAlert);
    _socket.on('emergency_resolved', _handleEmergencyResolved);
    _socket.on('circle_notification', _handleCircleNotification);
    LocationService.requestPermission();
    NotificationService.syncDeviceToken(ApiClient());
  }

  @override
  void dispose() {
    _socket.off('emergency_triggered');
    _socket.off('emergency_resolved');
    _socket.off('circle_notification');
    super.dispose();
  }

  void _handleCircleNotification(dynamic data) {
    if (!mounted || data == null) return;
    String title = 'Care Circle';
    String body = '';
    if (data is Map) {
      title = data['title']?.toString() ?? 'Care Circle';
      body = data['body']?.toString() ?? '';
    }
    final text = body.isNotEmpty ? '$title: $body' : title;
    context.showToast(text, type: ToastType.info, duration: const Duration(seconds: 4));
  }

  void _handleEmergencyAlert(dynamic data) {
    if (!mounted) return;
    final patientName = (data is Map && data['patientName'] != null)
        ? data['patientName']
        : 'A Care Circle Member';

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Row(
          children: const [
            Icon(Icons.warning_amber_rounded, color: AppColors.danger, size: 28),
            SizedBox(width: 8),
            Text('🚨 SOS ALERT',
                style: TextStyle(
                    color: AppColors.danger, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Text(
          '$patientName has triggered an Emergency SOS! Please check immediately.',
          style: const TextStyle(color: AppColors.textPrimary, fontSize: 16),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Dismiss',
                style: TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.danger),
            onPressed: () {
              Navigator.pop(ctx);
              setState(() => _currentIndex = 3);
            },
            child: const Text('View Emergency',
                style: TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  void _handleEmergencyResolved(dynamic data) {
    if (!mounted) return;
    context.showToast('Emergency has been resolved safely.',
        type: ToastType.success);
  }

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
