// lib/core/notification_service.dart
// SilverCare Push Notification Manager (FCM + Local Notifications)

import 'package:flutter/foundation.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'api_client.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // Executed in the background even if the app is closed/terminated
  await Firebase.initializeApp();
  debugPrint('[FCM Background] Message received: ${message.messageId} - ${message.notification?.title}');
}

class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();

  static const AndroidNotificationChannel _emergencyChannel =
      AndroidNotificationChannel(
    'silvercare_alerts',
    'Emergency & Critical Alerts',
    description: 'High-priority notifications for emergency SOS and vitals warnings',
    importance: Importance.max,
    playSound: true,
    enableVibration: true,
  );

  static bool _initialized = false;

  /// Initialize Firebase Cloud Messaging and Local Notification channels
  static Future<void> initialize() async {
    if (_initialized) return;

    try {
      await Firebase.initializeApp();
      FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

      // 1. Request notification permissions from user
      final messaging = FirebaseMessaging.instance;
      final settings = await messaging.requestPermission(
        alert: true,
        badge: true,
        sound: true,
        provisional: false,
      );

      debugPrint('[FCM] Notification authorization status: ${settings.authorizationStatus}');

      // 2. Setup Android notification channel for heads-up alerts
      const AndroidInitializationSettings androidSettings =
          AndroidInitializationSettings('@mipmap/ic_launcher');
      const DarwinInitializationSettings iosSettings =
          DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
      );

      const InitializationSettings initSettings = InitializationSettings(
        android: androidSettings,
        iOS: iosSettings,
      );

      await _localNotifications.initialize(initSettings);

      final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>();
      if (androidPlugin != null) {
        await androidPlugin.createNotificationChannel(_emergencyChannel);
      }

      // 3. Foreground message presentation
      await messaging.setForegroundNotificationPresentationOptions(
        alert: true,
        badge: true,
        sound: true,
      );

      // 4. Foreground message listener
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        debugPrint('[FCM Foreground] Received: ${message.notification?.title}');
        final notification = message.notification;
        final android = message.notification?.android;

        if (notification != null) {
          _localNotifications.show(
            notification.hashCode,
            notification.title,
            notification.body,
            NotificationDetails(
              android: AndroidNotificationDetails(
                _emergencyChannel.id,
                _emergencyChannel.name,
                channelDescription: _emergencyChannel.description,
                icon: android?.smallIcon ?? '@mipmap/ic_launcher',
                importance: Importance.max,
                priority: Priority.high,
                fullScreenIntent: true,
              ),
              iOS: const DarwinNotificationDetails(
                presentAlert: true,
                presentBadge: true,
                presentSound: true,
              ),
            ),
          );
        }
      });

      _initialized = true;
    } catch (e) {
      debugPrint('[FCM Init Warning] Firebase Messaging could not initialize: $e');
    }
  }

  /// Sync this device's unique FCM token to the SilverCare backend
  static Future<void> syncDeviceToken(ApiClient apiClient) async {
    try {
      final token = await FirebaseMessaging.instance.getToken();
      if (token != null && token.isNotEmpty) {
        debugPrint('[FCM] Syncing Device Token: $token');
        try {
          await apiClient.put(
            '/api/communication/preferences',
            data: {
              'devicePushToken': token,
              'pushEnabled': true,
            },
          );
          debugPrint('[FCM] Successfully synced device token to backend.');
        } catch (_) {
          // Fallback if route prefix differs
          await apiClient.put(
            '/communication/preferences',
            data: {
              'devicePushToken': token,
              'pushEnabled': true,
            },
          );
          debugPrint('[FCM] Synced device token via fallback route.');
        }
      }

      // Listen for token refreshes
      FirebaseMessaging.instance.onTokenRefresh.listen((newToken) async {
        debugPrint('[FCM] Token refreshed: $newToken');
        try {
          await apiClient.put(
            '/api/communication/preferences',
            data: {
              'devicePushToken': newToken,
              'pushEnabled': true,
            },
          );
        } catch (_) {
          await apiClient.put(
            '/communication/preferences',
            data: {
              'devicePushToken': newToken,
              'pushEnabled': true,
            },
          );
        }
      });
    } catch (e) {
      debugPrint('[FCM Token Sync Warning]: $e');
    }
  }
}
