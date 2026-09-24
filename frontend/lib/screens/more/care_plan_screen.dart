// lib/screens/more/care_plan_screen.dart
// Care Plan & Task Coordination (PRD 6.6)

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../core/api_client.dart';
import '../../widgets/app_card.dart';
import '../../widgets/app_badge.dart';
import '../../widgets/app_toast.dart';

class CarePlanScreen extends StatefulWidget {
  const CarePlanScreen({super.key});
  @override
  State<CarePlanScreen> createState() => _CarePlanScreenState();
}

class _CarePlanScreenState extends State<CarePlanScreen> {
  final ApiClient _api = ApiClient();
  List<dynamic> _tasks = [];
  dynamic _plan;
  bool _loading = true;
  final _taskTitleCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _taskTitleCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final auth = context.read<AuthProvider>();
    final patientId = auth.activePatientId;
    if (patientId.isEmpty) return;
    try {
      final planRes = await _api.get('/api/care-plans/patients/$patientId');
      final taskRes = await _api.get('/api/care-plans/patients/$patientId/tasks');
      if (mounted) {
        setState(() {
          _plan = planRes.data;
          _tasks = taskRes.data ?? [];
          _loading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _completeTask(String taskId) async {
    try {
      await _api.patch('/api/care-plans/tasks/$taskId/complete');
      if (mounted) {
        context.showToast('Task completed!', type: ToastType.success);
        _load();
      }
    } catch (e) {
      if (mounted) context.showToast('Failed to complete task', type: ToastType.error);
    }
  }

  bool _taskLoading = false;

  Future<void> _createTask([StateSetter? setModalState]) async {
    if (_taskLoading) return;
    final title = _taskTitleCtrl.text.trim();
    if (title.isEmpty) {
      context.showToast('Enter task title', type: ToastType.error);
      return;
    }
    setModalState?.call(() => _taskLoading = true);
    setState(() => _taskLoading = true);
    try {
      final auth = context.read<AuthProvider>();
      
      // Auto-create plan if it doesn't exist
      if (_plan == null) {
        final planRes = await _api.post('/api/care-plans/patients/${auth.activePatientId}', data: {
           'changeReason': 'Auto-created during task creation'
        });
        _plan = planRes.data;
      }
      
      final now = DateTime.now();
      await _api.post('/api/care-plans/tasks', data: {
        'carePlanId': _plan['id'],
        'patientId': auth.activePatientId,
        'title': title,
        'dueWindowStart': now.toIso8601String(),
        'dueWindowEnd': now.add(const Duration(hours: 24)).toIso8601String(),
        'category': 'GENERAL',
      });
      if (mounted) {
        context.showToast('Task added!', type: ToastType.success);
        _taskTitleCtrl.clear();
        Navigator.pop(context);
        _load();
      }
    } catch (e) {
      if (mounted) {
        context.showToast('Failed to create task', type: ToastType.error);
      }
    } finally {
      if (mounted) {
        setModalState?.call(() => _taskLoading = false);
        setState(() => _taskLoading = false);
      }
    }
  }

  void _showCreateModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.background,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(AppSpacing.base, 16, AppSpacing.base, MediaQuery.of(ctx).viewInsets.bottom + 24),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Text('New Task', style: AppTypography.bodyBold(size: AppTypography.lg)),
            const SizedBox(height: 16),
            TextField(
              controller: _taskTitleCtrl,
              decoration: InputDecoration(
                labelText: 'Task Title',
                hintText: 'e.g., Check Blood Sugar',
                prefixIcon: const Icon(Icons.assignment),
                filled: true,
                fillColor: AppColors.surface,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                minimumSize: const Size(double.infinity, 48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: _taskLoading ? null : () => _createTask(setModalState),
              child: _taskLoading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : Text('Add Task', style: AppTypography.bodyBold(color: Colors.white)),
            ),
          ]),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Care Plan'),
        backgroundColor: AppColors.background,
        actions: [
          if (context.watch<AuthProvider>().canWrite)
            IconButton(icon: const Icon(Icons.add, color: AppColors.primary), onPressed: () => _showCreateModal(context)),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : RefreshIndicator(
              onRefresh: _load,
              color: AppColors.primary,
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.base),
                children: [
                  // Plan overview
                  AppCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          const Icon(Icons.assignment, color: AppColors.success),
                          const SizedBox(width: 8),
                          Text('Care Plan', style: AppTypography.bodyBold(size: AppTypography.md)),
                        ]),
                        const SizedBox(height: 8),
                        Text(_plan?['notes'] ?? 'No care plan notes yet. Add dietary, mobility, and medication instructions here.',
                            style: AppTypography.body(size: AppTypography.sm, color: AppColors.textSecondary)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text('Tasks', style: AppTypography.bodyBold(size: AppTypography.md)),
                  const SizedBox(height: 12),
                  if (_tasks.isEmpty)
                    AppCard(
                      padding: const EdgeInsets.symmetric(vertical: 24),
                      child: Center(child: Text('📋 No tasks assigned', style: AppTypography.body(color: AppColors.textMuted))),
                    )
                  else
                    ..._tasks.map((task) {
                      final isCompleted = task['status'] == 'COMPLETED';
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: AppCard(
                          child: Row(
                            children: [
                              if (context.watch<AuthProvider>().canWrite)
                                GestureDetector(
                                  onTap: isCompleted ? null : () => _completeTask(task['id'].toString()),
                                  child: Container(
                                    width: 28, height: 28,
                                    decoration: BoxDecoration(
                                      color: isCompleted ? AppColors.successFaint : AppColors.surfaceElevated,
                                      borderRadius: BorderRadius.circular(6),
                                      border: Border.all(color: isCompleted ? AppColors.success : AppColors.surfaceBorder),
                                    ),
                                    child: isCompleted ? const Icon(Icons.check, size: 16, color: AppColors.success) : null,
                                  ),
                                ),
                              if (context.watch<AuthProvider>().canWrite)
                                const SizedBox(width: 12),
                              Expanded(child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(task['title'] ?? '', style: AppTypography.bodySemiBold(
                                    color: isCompleted ? AppColors.textMuted : AppColors.textPrimary,
                                  )),
                                  if (task['dueAt'] != null)
                                    Text('Due: ${task['dueAt']}', style: AppTypography.body(size: AppTypography.xs, color: AppColors.textMuted)),
                                ],
                              )),
                              AppBadge(
                                label: task['status'] ?? 'Pending',
                                variant: isCompleted ? BadgeVariant.success : BadgeVariant.warning,
                              ),
                            ],
                          ),
                        ),
                      );
                    }),
                ],
              ),
            ),
    );
  }
}
