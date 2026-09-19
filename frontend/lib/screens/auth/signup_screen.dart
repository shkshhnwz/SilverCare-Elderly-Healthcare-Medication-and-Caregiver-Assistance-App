// lib/screens/auth/signup_screen.dart
// Signup screen — ported from signup.tsx

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/auth_provider.dart';
import '../../widgets/app_input.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_toast.dart';
import 'package:dio/dio.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _handleSignup() async {
    if (_firstNameController.text.trim().isEmpty || _lastNameController.text.trim().isEmpty) {
      context.showToast('First and last name are required', type: ToastType.error);
      return;
    }
    if (_emailController.text.trim().isEmpty && _phoneController.text.trim().isEmpty) {
      context.showToast('Please provide an email or phone number', type: ToastType.error);
      return;
    }

    setState(() => _loading = true);
    try {
      final auth = context.read<AuthProvider>();
      await auth.signup(
        firstName: _firstNameController.text.trim(),
        lastName: _lastNameController.text.trim(),
        email: _emailController.text.trim().isNotEmpty
            ? _emailController.text.trim().toLowerCase()
            : null,
        phone: _phoneController.text.trim().isNotEmpty
            ? _phoneController.text.trim()
            : null,
      );
      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/home');
      }
    } on DioException catch (e) {
      if (mounted) {
        final msg = e.response?.data['message'] ?? 'Signup failed. Please try again.';
        context.showToast(msg, type: ToastType.error);
      }
    } catch (e) {
      if (mounted) {
        context.showToast('Signup failed. Please try again.', type: ToastType.error);
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
            AppSpacing.base, AppSpacing.xxl, AppSpacing.base, AppSpacing.base,
          ),
          child: Column(
            children: [
              // Header
              Column(
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      color: AppColors.primaryFaint,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 2),
                    ),
                    child: const Center(child: Text('🏥', style: TextStyle(fontSize: 28))),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text('SilverCare',
                      style: AppTypography.heading(size: AppTypography.xxl)
                          .copyWith(fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text('Join your care circle today',
                      style: AppTypography.body(
                          size: AppTypography.sm, color: AppColors.textMuted)),
                ],
              ),
              const SizedBox(height: AppSpacing.xl),

              // Card
              Container(
                padding: const EdgeInsets.all(AppSpacing.xl),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.surfaceBorder),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Create Account',
                        style: AppTypography.bodyBold(size: AppTypography.xl)),
                    const SizedBox(height: 4),
                    Text('Tell us about yourself',
                        style: AppTypography.body(
                            size: AppTypography.sm, color: AppColors.textMuted)),
                    const SizedBox(height: AppSpacing.lg),

                    // Name row
                    Row(
                      children: [
                        Expanded(
                          child: AppInput(
                            label: 'First Name',
                            placeholder: 'John',
                            controller: _firstNameController,
                            icon: Icons.person_outline,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: AppInput(
                            label: 'Last Name',
                            placeholder: 'Doe',
                            controller: _lastNameController,
                          ),
                        ),
                      ],
                    ),

                    AppInput(
                      label: 'Email Address',
                      placeholder: 'your@email.com',
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      icon: Icons.mail_outline,
                    ),

                    Center(
                      child: Text('— or —',
                          style: AppTypography.body(
                              size: AppTypography.xs, color: AppColors.textMuted)),
                    ),
                    const SizedBox(height: 4),

                    AppInput(
                      label: 'Phone Number',
                      placeholder: '+1 234 567 8900',
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      icon: Icons.call_outlined,
                    ),

                    AppButton(
                      label: 'Create Account',
                      onPressed: _handleSignup,
                      loading: _loading,
                      fullWidth: true,
                      margin: const EdgeInsets.only(top: 8),
                    ),

                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: AppSpacing.lg),
                      child: Row(
                        children: [
                          Expanded(child: Divider(color: AppColors.surfaceBorder)),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 8),
                            child: Text('Already have an account?',
                                style: AppTypography.body(
                                    size: AppTypography.xs,
                                    color: AppColors.textMuted)),
                          ),
                          Expanded(child: Divider(color: AppColors.surfaceBorder)),
                        ],
                      ),
                    ),

                    AppButton(
                      label: 'Sign In',
                      onPressed: () => Navigator.of(context).pop(),
                      variant: AppButtonVariant.ghost,
                      fullWidth: true,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
