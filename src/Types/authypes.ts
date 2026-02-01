// authTypes.ts - Authentication related type definitions

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Login form errors
 */
export interface LoginFormErrors {
  email?: string;
  password?: string;
}

/**
 * Register form data structure
 */
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  parentName: string;
  parentMobile: string;
  state: string;
  city: string;
  password: string;
  confirmPassword: string;
}

/**
 * Register form errors
 */
export interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  parentName?: string;
  parentMobile?: string;
  state?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
}

/**
 * Touched fields for login form
 */
export interface LoginTouchedFields {
  email?: boolean;
  password?: boolean;
}

/**
 * Touched fields for register form
 */
export interface RegisterTouchedFields {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  mobile?: boolean;
  parentName?: boolean;
  parentMobile?: boolean;
  state?: boolean;
  city?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

/**
 * Authentication mode
 */
export type AuthMode = 'login' | 'register' | 'otp' | 'forgot-password';

/**
 * Login form field names
 */
export type LoginFieldName = keyof LoginFormData;

/**
 * Register form field names
 */
export type RegisterFieldName = keyof RegisterFormData;

/**
 * Auth modal props
 */
export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: AuthUser) => void;
  initialMode?: AuthMode;
}

/**
 * Authenticated user data
 */
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  role: 'student';
  avatar?: string;
}

/**
 * Login API response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
}

/**
 * Register API response
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
}

/**
 * OTP verification data
 */
export interface OTPFormData {
  email: string;
  otp: string;
}

/**
 * Forgot password data
 */
export interface ForgotPasswordData {
  email: string;
}