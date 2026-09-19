// lib/core/socket_service.dart
// Socket.IO singleton for real-time care circle events
// Ported from React Native socket.ts

import 'package:socket_io_client/socket_io_client.dart' as io;
import 'config.dart';

class SocketService {
  static final SocketService _instance = SocketService._internal();
  factory SocketService() => _instance;

  io.Socket? _socket;

  SocketService._internal();

  io.Socket get socket {
    _socket ??= io.io(
      AppConfig.apiBaseUrl,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );
    return _socket!;
  }

  void connect(String token) {
    final s = socket;
    s.auth = {'token': token};
    if (!s.connected) {
      s.connect();
    }
  }

  void disconnect() {
    if (_socket?.connected == true) {
      _socket!.disconnect();
    }
  }

  void joinCareCircle(String patientId) {
    socket.emit('join_care_circle', patientId);
  }

  void leaveCareCircle(String patientId) {
    socket.emit('leave_care_circle', patientId);
  }

  /// Listen to a socket event. Returns a dispose function.
  void on(String event, Function(dynamic) callback) {
    socket.on(event, callback);
  }

  /// Remove a listener for a socket event.
  void off(String event) {
    socket.off(event);
  }
}
