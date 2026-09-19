// lib/screens/auth/login_screen.dart
// Login screen — email or phone-based login
// Ported from React Native login.tsx

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../widgets/app_input.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_toast.dart';
import 'package:dio/dio.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String _mode = 'email'; // 'email' | 'phone'
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (_mode == 'email' && _emailController.text.trim().isEmpty) {
      context.showToast('Please enter your email address', type: ToastType.error);
      return;
    }
    if (_mode == 'phone' && _phoneController.text.trim().isEmpty) {
      context.showToast('Please enter your phone number', type: ToastType.error);
      return;
    }

    setState(() => _loading = true);
    try {
      final auth = context.read<AuthProvider>();
      await auth.login(
        email: _mode == 'email' ? _emailController.text.trim().toLowerCase() : null,
        phone: _mode == 'phone' ? _phoneController.text.trim() : null,
      );
      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/home');
      }
    } catch (e) {
      if (mounted) {
        final msg = e.toString().contains('message')
            ? 'Login failed. Please try again.'
            : 'Login failed. Please try again.';
        context.showToast(msg, type: ToastType.error);
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.fromLTRB(
            AppSpacing.base,
            AppSpacing.xxxl,
            AppSpacing.base,
            AppSpacing.base,
          ),
          child: Column(
            children: [
              // ── Header ──────────────────────────────────────────────
              _buildHeader(),
              const SizedBox(height: AppSpacing.xxl),

              // ── Card ────────────────────────────────────────────────
              Container(
                padding: const EdgeInsets.all(AppSpacing.xl),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.surfaceBorder),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withValues(alpha: 0.08),
                      blurRadius: 20,
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Welcome Back',
                        style: AppTypography.bodyBold(size: AppTypography.xl)),
                    const SizedBox(height: 4),
                    Text('Sign in to your care circle',
                        style: AppTypography.body(
                            size: AppTypography.sm, color: AppColors.textMuted)),
                    const SizedBox(height: AppSpacing.xl),

                    // Mode toggle
                    _buildModeToggle(),
                    const SizedBox(height: AppSpacing.lg),

                    // Input
                    if (_mode == 'email')
                      AppInput(
                        label: 'Email Address',
                        placeholder: 'your@email.com',
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        icon: Icons.mail_outline,
                      )
                    else
                      AppInput(
                        label: 'Phone Number',
                        placeholder: '+1 234 567 8900',
                        controller: _phoneController,
                        keyboardType: TextInputType.phone,
                        icon: Icons.call_outlined,
                      ),

                    AppButton(
                      label: 'Sign In',
                      onPressed: _handleLogin,
                      loading: _loading,
                      fullWidth: true,
                      margin: const EdgeInsets.only(top: 8),
                    ),

                    // Divider
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: AppSpacing.lg),
                      child: Row(
                        children: [
                          Expanded(child: Divider(color: AppColors.surfaceBorder)),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 8),
                            child: Text('New to SilverCare?',
                                style: AppTypography.body(
                                    size: AppTypography.xs,
                                    color: AppColors.textMuted)),
                          ),
                          Expanded(child: Divider(color: AppColors.surfaceBorder)),
                        ],
                      ),
                    ),

                    AppButton(
                      label: 'Create Account',
                      onPressed: () => Navigator.of(context).pushNamed('/signup'),
                      variant: AppButtonVariant.ghost,
                      fullWidth: true,
                    ),
                  ],
                ),
              ),

              const SizedBox(height: AppSpacing.xl),
              Text(
                'By signing in, you agree to our Terms of Service and Privacy Policy.',
                textAlign: TextAlign.center,
                style: AppTypography.body(
                    size: AppTypography.xs, color: AppColors.textMuted),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: AppColors.primaryFaint,
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.primary, width: 2),
          ),
          child: const Center(child: Text('🏥', style: TextStyle(fontSize: 36))),
        ),
        const SizedBox(height: AppSpacing.md),
        Text('SilverCare',
            style: AppTypography.heading(size: AppTypography.xxxl)
                .copyWith(fontWeight: FontWeight.w800, letterSpacing: -0.5)),
        const SizedBox(height: 4),
        Text('Elderly Healthcare & Caregiver Coordination',
            textAlign: TextAlign.center,
            style: AppTypography.body(
                size: AppTypography.sm, color: AppColors.textMuted)),
      ],
    );
  }

  Widget _buildModeToggle() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          _modeButton('Email', 'email'),
          _modeButton('Phone', 'phone'),
        ],
      ),
    );
  }

  Widget _modeButton(String label, String mode) {
    final isActive = _mode == mode;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _mode = mode),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isActive ? AppColors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: Text(
              label,
              style: AppTypography.bodySemiBold(
                size: AppTypography.sm,
                color: isActive ? AppColors.textInverse : AppColors.textMuted,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
