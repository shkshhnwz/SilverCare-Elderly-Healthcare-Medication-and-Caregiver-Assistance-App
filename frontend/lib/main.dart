// lib/main.dart
// SilverCare Flutter App — entry point
// Providers, routes, and theme setup

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/theme.dart';
import 'core/auth_provider.dart';

import 'screens/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/signup_screen.dart';
import 'screens/app_shell.dart';
import 'screens/more/care_circle_screen.dart';
import 'screens/more/location_screen.dart';
import 'screens/more/care_plan_screen.dart';
import 'screens/more/appointments_screen.dart';
import 'screens/more/communication_screen.dart';
import 'screens/more/reports_screen.dart';
import 'screens/more/settings_screen.dart';
import 'core/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NotificationService.initialize();
  runApp(const SilverCareApp());
}

class SilverCareApp extends StatelessWidget {
  const SilverCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        title: 'SilverCare',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        initialRoute: '/',
        routes: {
          '/': (context) => const SplashScreen(),
          '/login': (context) => const LoginScreen(),
          '/signup': (context) => const SignupScreen(),
          '/home': (context) => const AppShell(),
          '/care-circle': (context) => const CareCircleScreen(),
          '/location': (context) => const LocationScreen(),
          '/care-plan': (context) => const CarePlanScreen(),
          '/appointments': (context) => const AppointmentsScreen(),
          '/communication': (context) => const CommunicationScreen(),
          '/reports': (context) => const ReportsScreen(),
          '/settings': (context) => const SettingsScreen(),
        },
      ),
    );
  }
}
