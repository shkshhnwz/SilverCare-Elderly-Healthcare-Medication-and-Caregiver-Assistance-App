// lib/core/config.dart
// App-wide configuration — API base URL, timeouts

class AppConfig {
  AppConfig._();

  /// Backend API base URL.
  /// For Android emulator, 10.0.2.2 maps to the host machine's localhost.
  /// Change to your LAN IP for physical device testing.
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://silvercare-elderly-healthcare-medication.onrender.com',
  );

  /// HTTP request timeout in milliseconds.
  static const int httpTimeout = 30000;

  /// Local storage keys
  static const String tokenKey = 'silvercare_token';
  static const String userKey = 'silvercare_user';
}
