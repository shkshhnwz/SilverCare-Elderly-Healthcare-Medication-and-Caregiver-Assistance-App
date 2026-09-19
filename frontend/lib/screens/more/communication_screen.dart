// lib/screens/more/communication_screen.dart
// Communication & Notification Hub — activity feed & care chat (PRD 6.8)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../core/socket_service.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_toast.dart';

class CommunicationScreen extends StatefulWidget {
  const CommunicationScreen({super.key});
  @override
  State<CommunicationScreen> createState() => _CommunicationScreenState();
}

class _CommunicationScreenState extends State<CommunicationScreen> {
  final ApiClient _api = ApiClient();
  final SocketService _socket = SocketService();
  List<dynamic> _feed = [];
  bool _loading = true;
  final _messageCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _load();
    _socket.on('activity_feed', (data) {
      if (mounted) setState(() => _feed.insert(0, data));
    });
  }

  @override
  void dispose() {
    _messageCtrl.dispose();
    _socket.off('activity_feed');
    super.dispose();
  }

  Future<void> _load() async {
    final user = context.read<AuthProvider>().user;
    if (user == null) return;
    try {
      final res = await _api.get('/api/activity/patients/${user.id}');
      if (mounted) setState(() { _feed = res.data ?? []; _loading = false; });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _sendMessage() async {
    if (_messageCtrl.text.trim().isEmpty) return;
    try {
      final user = context.read<AuthProvider>().user;
      await _api.post('/api/activity/message', data: {
        'patientId': user!.id,
        'message': _messageCtrl.text.trim(),
      });
      _messageCtrl.clear();
      _load();
    } catch (e) {
      if (mounted) context.showToast('Failed to send', type: ToastType.error);
    }
  }

  IconData _eventIcon(String? type) {
    switch (type) {
      case 'medication': return Icons.medical_services;
      case 'vitals': return Icons.favorite;
      case 'emergency': return Icons.error;
      case 'task': return Icons.assignment;
      case 'message': return Icons.chat_bubble;
      default: return Icons.notifications;
    }
  }

  Color _eventColor(String? type) {
    switch (type) {
      case 'medication': return AppColors.primary;
      case 'vitals': return AppColors.danger;
      case 'emergency': return AppColors.sos;
      case 'task': return AppColors.success;
      case 'message': return AppColors.info;
      default: return AppColors.textMuted;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Communication'), backgroundColor: AppColors.background),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : Column(
              children: [
                Expanded(
                  child: RefreshIndicator(
                    onRefresh: _load,
                    color: AppColors.primary,
                    child: _feed.isEmpty
                        ? ListView(children: [
                            const SizedBox(height: 60),
                            Center(child: Column(children: [
                              const Text('💬', style: TextStyle(fontSize: 48)),
                              const SizedBox(height: 12),
                              Text('No Activity Yet', style: AppTypography.bodyBold(size: AppTypography.lg)),
                              Text('Events from your care circle will appear here',
                                  style: AppTypography.body(size: AppTypography.sm, color: AppColors.textMuted)),
                            ])),
                          ])
                        : ListView.builder(
                            padding: const EdgeInsets.all(AppSpacing.base),
                            itemCount: _feed.length,
                            itemBuilder: (_, i) {
                              final item = _feed[i];
                              final eventType = item['type']?.toString();
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 8),
                                child: AppCard(
                                  child: Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        width: 36, height: 36,
                                        decoration: BoxDecoration(
                                          color: _eventColor(eventType).withValues(alpha: 0.13),
                                          borderRadius: BorderRadius.circular(10),
                                        ),
                                        child: Icon(_eventIcon(eventType), size: 18, color: _eventColor(eventType)),
                                      ),
                                      const SizedBox(width: 12),
                                      Expanded(child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(item['message'] ?? item['title'] ?? '', style: AppTypography.body(size: AppTypography.sm)),
                                          const SizedBox(height: 2),
                                          Text(item['createdAt'] ?? '', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                                        ],
                                      )),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
                ),
                // Message input
                Container(
                  padding: EdgeInsets.fromLTRB(AppSpacing.base, 8, AppSpacing.base, MediaQuery.of(context).padding.bottom + 8),
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    border: Border(top: BorderSide(color: AppColors.surfaceBorder)),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _messageCtrl,
                          style: AppTypography.body(),
                          decoration: InputDecoration(
                            hintText: 'Send a message...',
                            hintStyle: AppTypography.body(color: AppColors.textMuted),
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: _sendMessage,
                        icon: const Icon(Icons.send, color: AppColors.primary),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
