// lib/core/api_client.dart
// Central Dio HTTP client for SilverCare API communication
// Ported from React Native api.ts

import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'config.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiClient._internal() {
    dio = Dio(BaseOptions(
      baseUrl: AppConfig.apiBaseUrl,
      connectTimeout: const Duration(milliseconds: AppConfig.httpTimeout),
      receiveTimeout: const Duration(milliseconds: AppConfig.httpTimeout),
      headers: {'Content-Type': 'application/json'},
    ));

    // Attach JWT token to every request
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: AppConfig.tokenKey);
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        // On 401, clear storage (token expired/invalid)
        if (error.response?.statusCode == 401) {
          await _storage.delete(key: AppConfig.tokenKey);
          await _storage.delete(key: AppConfig.userKey);
        }
        return handler.next(error);
      },
    ));
  }

  // ── Convenience methods ─────────────────────────────────────────────────
  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) {
    return dio.get(path, queryParameters: queryParameters);
  }

  Future<Response> post(String path, {dynamic data}) {
    return dio.post(path, data: data);
  }

  Future<Response> patch(String path, {dynamic data}) {
    return dio.patch(path, data: data);
  }

  Future<Response> put(String path, {dynamic data}) {
    return dio.put(path, data: data);
  }

  Future<Response> delete(String path, {dynamic data}) {
    return dio.delete(path, data: data);
  }
}
