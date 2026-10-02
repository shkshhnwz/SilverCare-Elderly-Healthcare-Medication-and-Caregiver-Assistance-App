// lib/screens/auth/signup_screen.dart
// Signup screen — registration with compulsory contact number and password

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
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignup() async {
    final firstName = _firstNameController.text.trim();
    final lastName = _lastNameController.text.trim();
    final phone = _phoneController.text.trim();
    final email = _emailController.text.trim().toLowerCase();
    final password = _passwordController.text.trim();
    final confirmPassword = _confirmPasswordController.text.trim();

    if (firstName.isEmpty || lastName.isEmpty) {
      context.showToast('First and last name are required', type: ToastType.error);
      return;
    }

    // Contact number is strictly compulsory
    if (phone.isEmpty) {
      context.showToast('Contact number is compulsory', type: ToastType.error);
      return;
    }

    // Password validations
    if (password.isEmpty) {
      context.showToast('Password is required', type: ToastType.error);
      return;
    }

    if (password.length < 6) {
      context.showToast('Password must be at least 6 characters', type: ToastType.error);
      return;
    }

    if (password != confirmPassword) {
      context.showToast('Passwords do not match', type: ToastType.error);
      return;
    }

    setState(() => _loading = true);
    try {
      final auth = context.read<AuthProvider>();
      await auth.signup(
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        password: password,
        email: email.isNotEmpty ? email : null,
      );
      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/home');
      }
    } on DioException catch (e) {
      if (mounted) {
        final msg = e.response?.data?['message'] ?? 'Signup failed. Please try again.';
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
                  ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: Image.asset(
                      'assets/brand/silvercare-app-icon-512x512.png',
                      width: 64,
                      height: 64,
                    ),
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
                    Text('Fill in your details below',
                        style: AppTypography.body(
                            size: AppTypography.sm, color: AppColors.textMuted)),
                    const SizedBox(height: AppSpacing.lg),

                    // Name row
                    Row(
                      children: [
                        Expanded(
                          child: AppInput(
                            label: 'First Name *',
                            placeholder: 'John',
                            controller: _firstNameController,
                            icon: Icons.person_outline,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: AppInput(
                            label: 'Last Name *',
                            placeholder: 'Doe',
                            controller: _lastNameController,
                          ),
                        ),
                      ],
                    ),

                    // Compulsory Phone Number
                    AppInput(
                      label: 'Contact Number * (Compulsory)',
                      placeholder: '+1 234 567 8900',
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      icon: Icons.call_outlined,
                    ),

                    // Optional Email Address
                    AppInput(
                      label: 'Email Address (Optional)',
                      placeholder: 'your@email.com',
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      icon: Icons.mail_outline,
                    ),

                    // Compulsory Password
                    AppInput(
                      label: 'Password * (Min 6 chars)',
                      placeholder: 'Create a password',
                      controller: _passwordController,
                      obscureText: true,
                      secureToggle: true,
                      icon: Icons.lock_outline,
                    ),

                    // Confirm Password
                    AppInput(
                      label: 'Confirm Password *',
                      placeholder: 'Confirm your password',
                      controller: _confirmPasswordController,
                      obscureText: true,
                      secureToggle: true,
                      icon: Icons.lock_outline,
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
