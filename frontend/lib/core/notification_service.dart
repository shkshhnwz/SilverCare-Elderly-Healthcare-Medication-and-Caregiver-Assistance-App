// lib/core/notification_service.dart
// SilverCare Push Notification Manager (FCM + Local Notifications)

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:geolocator/geolocator.dart';
import 'api_client.dart';
import 'theme.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  try {
    await Firebase.initializeApp();
    debugPrint('[FCM Background] Message received: ${message.messageId} - ${message.notification?.title}');

    // If notification payload is absent (data-only message), display using local notifications
    if (message.notification == null && message.data.isNotEmpty) {
      final title = message.data['title'] ?? '🚨 Emergency Alert';
      final body = message.data['body'] ?? 'Care Circle notification';
      final localNotifications = FlutterLocalNotificationsPlugin();
      const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
      await localNotifications.initialize(const InitializationSettings(android: androidSettings));
      await localNotifications.show(
        DateTime.now().millisecondsSinceEpoch ~/ 1000,
        title,
        body,
        const NotificationDetails(
          android: AndroidNotificationDetails(
            'silvercare_emergency_v2',
            '🚨 SilverCare Emergency & Critical Alerts',
            channelDescription: 'High-priority sound and heads-up banner alerts for emergency SOS and vitals warnings',
            importance: Importance.max,
            priority: Priority.high,
            fullScreenIntent: true,
            playSound: true,
            enableVibration: true,
          ),
        ),
      );
    }
  } catch (e) {
    debugPrint('[FCM Background Handler Error]: $e');
  }
}

class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();

  static const AndroidNotificationChannel _emergencyChannel =
      AndroidNotificationChannel(
    'silvercare_emergency_v2',
    '🚨 SilverCare Emergency & Critical Alerts',
    description: 'High-priority sound and heads-up banner alerts for emergency SOS and vitals warnings',
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

      // 1. Request notification permissions from Firebase Messaging
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
        // Explicitly request Android 13+ (API 33+) POST_NOTIFICATIONS runtime permission
        final granted = await androidPlugin.requestNotificationsPermission();
        debugPrint('[FCM] Android POST_NOTIFICATIONS permission granted: $granted');
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

        final title = notification?.title ?? message.data['title'];
        final body = notification?.body ?? message.data['body'];

        if (title != null || body != null) {
          _localNotifications.show(
            message.messageId?.hashCode ?? (DateTime.now().millisecondsSinceEpoch ~/ 1000),
            title ?? 'SilverCare Alert',
            body ?? '',
            NotificationDetails(
              android: AndroidNotificationDetails(
                _emergencyChannel.id,
                _emergencyChannel.name,
                channelDescription: _emergencyChannel.description,
                icon: android?.smallIcon ?? '@mipmap/ic_launcher',
                importance: Importance.max,
                priority: Priority.high,
                fullScreenIntent: true,
                playSound: true,
                enableVibration: true,
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

  /// Check if notifications are blocked and prompt user to enable in system settings
  static Future<void> checkAndPromptPermission(BuildContext context) async {
    try {
      final messaging = FirebaseMessaging.instance;
      final settings = await messaging.getNotificationSettings();
      if (settings.authorizationStatus == AuthorizationStatus.denied) {
        if (!context.mounted) return;
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            backgroundColor: AppColors.surface,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            title: Row(
              children: const [
                Icon(Icons.notifications_off_outlined, color: AppColors.warning, size: 24),
                SizedBox(width: 8),
                Text('Enable Notifications', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
            content: const Text(
              'Notifications are currently blocked for SilverCare on this phone. To receive emergency SOS and care alerts, please allow notifications in system settings.',
              style: TextStyle(color: AppColors.textSecondary, fontSize: 14),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Later', style: TextStyle(color: AppColors.textMuted)),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                onPressed: () {
                  Navigator.pop(ctx);
                  Geolocator.openAppSettings();
                },
                child: const Text('Open Settings', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        );
      }
    } catch (_) {}
  }

  /// Sync this device's unique FCM token to the SilverCare backend
  static Future<void> syncDeviceToken(ApiClient apiClient) async {
    try {
      final token = await FirebaseMessaging.instance.getToken();
      if (token != null && token.isNotEmpty) {
        debugPrint('[FCM] Syncing Device Token: $token');
        for (final path in [
          '/api/communication/preferences',
          '/api/communication-hub/notifications/preferences',
          '/communication/preferences',
        ]) {
          try {
            await apiClient.put(path, data: {'devicePushToken': token, 'pushEnabled': true});
            debugPrint('[FCM] Successfully synced device token to backend via $path');
            break;
          } catch (_) {
            try {
              await apiClient.post(path, data: {'devicePushToken': token, 'pushEnabled': true});
              debugPrint('[FCM] Successfully posted device token to backend via $path');
              break;
            } catch (_) {}
          }
        }
      }

      // Listen for token refreshes
      FirebaseMessaging.instance.onTokenRefresh.listen((newToken) async {
        debugPrint('[FCM] Token refreshed: $newToken');
        for (final path in [
          '/api/communication/preferences',
          '/api/communication-hub/notifications/preferences',
          '/communication/preferences',
        ]) {
          try {
            await apiClient.put(path, data: {'devicePushToken': newToken, 'pushEnabled': true});
            break;
          } catch (_) {
            try {
              await apiClient.post(path, data: {'devicePushToken': newToken, 'pushEnabled': true});
              break;
            } catch (_) {}
          }
        }
      });
    } catch (e) {
      debugPrint('[FCM Token Sync Warning]: $e');
    }
  }
}
