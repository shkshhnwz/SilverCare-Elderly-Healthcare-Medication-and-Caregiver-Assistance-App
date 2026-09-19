// Global authentication state — ChangeNotifier-based
// Ported from React Native AuthContext.tsx
// ignore_for_file: use_null_aware_elements

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'api_client.dart';
import 'socket_service.dart';
import 'config.dart';

class User {
  final String id;
  final String firstName;
  final String lastName;
  final String? email;
  final String? phone;
  final bool isActive;

  User({
    required this.id,
    required this.firstName,
    required this.lastName,
    this.email,
    this.phone,
    this.isActive = true,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'].toString(),
      firstName: json['firstName'] ?? '',
      lastName: json['lastName'] ?? '',
      email: json['email'],
      phone: json['phone'],
      isActive: json['isActive'] ?? true,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'phone': phone,
    'isActive': isActive,
  };

  String get initials => '${firstName.isNotEmpty ? firstName[0] : ''}${lastName.isNotEmpty ? lastName[0] : ''}';
}

class AuthProvider extends ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = true;

  String? _activePatientId;
  String? _activeRole;
  List<dynamic> _availableCircles = [];

  final FlutterSecureStorage _storage = const FlutterSecureStorage();
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();

  User? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null && _token != null;

  String get activePatientId => _activePatientId ?? _user?.id ?? '';
  String? get activeRole => _activeRole;
  List<dynamic> get availableCircles => _availableCircles;
  bool get canWrite => _activeRole != 'CAREGIVER_VIEW';

  /// Restore session on app launch
  Future<void> restoreSession() async {
    try {
      final storedToken = await _storage.read(key: AppConfig.tokenKey);
      final storedUser = await _storage.read(key: AppConfig.userKey);
      if (storedToken != null && storedUser != null) {
        _token = storedToken;
        _user = User.fromJson(jsonDecode(storedUser));
        _socket.connect(storedToken);
        await fetchUserCircles();
      }
    } catch (_) {
      // Silent fail — user will need to re-login
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> _persist(String token, User user) async {
    await _storage.write(key: AppConfig.tokenKey, value: token);
    await _storage.write(key: AppConfig.userKey, value: jsonEncode(user.toJson()));
    _token = token;
    _user = user;
    _socket.connect(token);
    await fetchUserCircles();
    notifyListeners();
  }

  Future<void> fetchUserCircles() async {
    if (_user == null) return;
    try {
      final res = await _api.get('/api/care-circles/users/${_user!.id}');
      _availableCircles = res.data ?? [];
      
      if (_availableCircles.isNotEmpty) {
        // Try to load last selected context from storage, otherwise default to first
        final lastSelectedId = await _storage.read(key: 'activePatientId');
        
        dynamic selectedCircle;
        if (lastSelectedId != null) {
          selectedCircle = _availableCircles.firstWhere(
            (c) => c['patientId'] == lastSelectedId, 
            orElse: () => _availableCircles.first
          );
        } else {
          selectedCircle = _availableCircles.first;
        }

        _activePatientId = selectedCircle['patientId'];
        
        final memberships = selectedCircle['memberships'] as List?;
        if (memberships != null) {
          final myMembership = memberships.firstWhere(
            (m) => m['userId'] == _user!.id, 
            orElse: () => null
          );
          _activeRole = myMembership?['role']?['name'];
        }
      } else {
        _activePatientId = _user!.id;
        _activeRole = 'OWNER'; // Solo patient
      }
    } catch (e) {
      _activePatientId = _user!.id;
      _activeRole = 'OWNER';
    }
    notifyListeners();
  }

  void switchPatient(String patientId, String role) async {
    _activePatientId = patientId;
    _activeRole = role;
    await _storage.write(key: 'activePatientId', value: patientId);
    notifyListeners();
  }

  Future<void> login({String? email, String? phone}) async {
    final res = await _api.post('/api/auth/login', data: {
      if (email != null) 'email': email,
      if (phone != null) 'phone': phone,
    });
    final data = res.data;
    await _persist(data['token'], User.fromJson(data['user']));
  }

  Future<void> signup({
    required String firstName,
    required String lastName,
    String? email,
    String? phone,
  }) async {
    final res = await _api.post('/api/auth/signup', data: {
      'firstName': firstName,
      'lastName': lastName,
      if (email != null) 'email': email,
      if (phone != null) 'phone': phone,
    });
    final data = res.data;
    await _persist(data['token'], User.fromJson(data['user']));
  }

  Future<void> logout() async {
    await _storage.delete(key: AppConfig.tokenKey);
    await _storage.delete(key: AppConfig.userKey);
    await _storage.delete(key: 'activePatientId');
    _socket.disconnect();
    _token = null;
    _user = null;
    _activePatientId = null;
    _activeRole = null;
    _availableCircles = [];
    notifyListeners();
  }
}
