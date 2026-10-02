// lib/core/location_service.dart
// Location service for GPS tracking, SOS location sharing, and geofencing

import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'api_client.dart';

class LocationService {
  static final ApiClient _api = ApiClient();
  static Timer? _trackingTimer;

  /// Check if periodic tracking is currently active
  static bool get isPeriodicTrackingActive => _trackingTimer != null && _trackingTimer!.isActive;

  /// Request GPS location permission from the device
  static Future<bool> requestPermission() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        debugPrint('[Location] Location services are disabled on device.');
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          debugPrint('[Location] Location permissions are denied');
          return false;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        debugPrint('[Location] Location permissions are permanently denied.');
        return false;
      }

      return permission == LocationPermission.whileInUse ||
          permission == LocationPermission.always;
    } catch (e) {
      debugPrint('[Location Error] Failed to request location permission: $e');
      return false;
    }
  }

  /// Get current GPS coordinates (lat, lng, accuracy)
  static Future<Position?> getCurrentPosition() async {
    try {
      final hasPermission = await requestPermission();
      if (!hasPermission) return null;

      return await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          timeLimit: Duration(seconds: 10),
        ),
      );
    } catch (e) {
      debugPrint('[Location Error] Could not obtain current position: $e');
      try {
        // Fallback to last known position
        return await Geolocator.getLastKnownPosition();
      } catch (_) {
        return null;
      }
    }
  }

  /// Send a location ping to the backend geofencing service
  static Future<Map<String, dynamic>?> sendLocationPing({
    required String patientId,
    double? latitude,
    double? longitude,
    double? accuracyMeters,
    int? batteryLevel,
  }) async {
    try {
      double? lat = latitude;
      double? lng = longitude;
      double? acc = accuracyMeters;

      if (lat == null || lng == null) {
        final pos = await getCurrentPosition();
        if (pos == null) {
          debugPrint('[Location] Cannot send ping: GPS coordinates unavailable.');
          return null;
        }
        lat = pos.latitude;
        lng = pos.longitude;
        acc = pos.accuracy;
      }

      final res = await _api.post('/api/location-safety/pings', data: {
        'patientId': patientId,
        'latitude': lat,
        'longitude': lng,
        if (acc != null) 'accuracyMeters': acc,
        if (batteryLevel != null) 'batteryLevel': batteryLevel,
      });

      debugPrint('[Location] Ping recorded successfully: InsideSafeZone=${res.data?['isInsideSafeZone']}');
      return res.data is Map<String, dynamic> ? res.data as Map<String, dynamic> : null;
    } catch (e) {
      debugPrint('[Location] Failed to send location ping: $e');
      return null;
    }
  }

  /// Start periodic automated location pings for care recipient safety
  static void startPeriodicTracking({
    required String patientId,
    Duration interval = const Duration(minutes: 5),
  }) {
    if (patientId.isEmpty) return;
    stopPeriodicTracking();

    debugPrint('[LocationService] Starting periodic location pings every ${interval.inMinutes}m for patient: $patientId');

    // Send immediate ping
    sendLocationPing(patientId: patientId);

    // Setup periodic ping loop
    _trackingTimer = Timer.periodic(interval, (_) {
      sendLocationPing(patientId: patientId);
    });
  }

  /// Stop automated tracking
  static void stopPeriodicTracking() {
    if (_trackingTimer != null) {
      debugPrint('[LocationService] Stopping periodic tracking.');
      _trackingTimer?.cancel();
      _trackingTimer = null;
    }
  }
}
