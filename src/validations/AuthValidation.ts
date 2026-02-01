// authValidation.ts - Validation functions for authentication forms

// authValidation.ts - Validation functions for authentication forms
import type {
    LoginFormData,
    LoginFormErrors,
    RegisterFormData,
    RegisterFormErrors,
    LoginFieldName,
    RegisterFieldName,
} from '../Types/authypes';

/**
 * Validation patterns
 */
const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MOBILE: /^[6-9]\d{9}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

/**
 * Validate first name
 */
export const validateFirstName = (name: string): string => {
  if (!name.trim()) {
    return 'First name is required';
  }
  if (name.trim().length < 2) {
    return 'First name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return 'First name should contain only letters';
  }
  return '';
};

/**
 * Validate last name
 */
export const validateLastName = (name: string): string => {
  if (!name.trim()) {
    return 'Last name is required';
  }
  if (name.trim().length < 2) {
    return 'Last name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return 'Last name should contain only letters';
  }
  return '';
};

/**
 * Validate email
 */
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!PATTERNS.EMAIL.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

/**
 * Validate password
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!PATTERNS.PASSWORD.test(password)) {
    return 'Password must contain uppercase, lowercase, and number';
  }
  return '';
};

/**
 * Validate mobile number
 */
export const validateMobile = (mobile: string): string => {
  if (!mobile.trim()) {
    return 'Mobile number is required';
  }
  if (!PATTERNS.MOBILE.test(mobile.trim())) {
    return 'Please enter a valid 10-digit mobile number';
  }
  return '';
};

/**
 * Validate parent name
 */
export const validateParentName = (name: string): string => {
  if (!name.trim()) {
    return 'Parent name is required';
  }
  if (name.trim().length < 2) {
    return 'Parent name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return 'Parent name should contain only letters';
  }
  return '';
};

/**
 * Validate parent mobile number
 */
export const validateParentMobile = (mobile: string): string => {
  if (!mobile.trim()) {
    return 'Parent mobile number is required';
  }
  if (!PATTERNS.MOBILE.test(mobile.trim())) {
    return 'Please enter a valid 10-digit mobile number';
  }
  return '';
};

/**
 * Validate state
 */
export const validateState = (state: string): string => {
  if (!state || !state.trim()) {
    return 'State is required';
  }
  return '';
};

/**
 * Validate city
 */
export const validateCity = (city: string): string => {
  if (!city.trim()) {
    return 'City is required';
  }
  if (city.trim().length < 2) {
    return 'City must be at least 2 characters';
  }
  return '';
};

/**
 * Validate confirm password
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

/**
 * Validate single login field
 */
export const validateLoginField = (
  name: LoginFieldName,
  value: string
): string => {
  switch (name) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return '';
  }
};

/**
 * Validate entire login form
 */
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  return {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
};

/**
 * Validate single register field
 */
export const validateRegisterField = (
  name: RegisterFieldName,
  value: string,
  allValues?: RegisterFormData
): string => {
  switch (name) {
    case 'firstName':
      return validateFirstName(value);
    case 'lastName':
      return validateLastName(value);
    case 'email':
      return validateEmail(value);
    case 'mobile':
      return validateMobile(value);
    case 'parentName':
      return validateParentName(value);
    case 'parentMobile':
      return validateParentMobile(value);
    case 'state':
      return validateState(value);
    case 'city':
      return validateCity(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validateConfirmPassword(
        allValues?.password || '',
        value
      );
    default:
      return '';
  }
};

/**
 * Validate entire register form
 */
export const validateRegisterForm = (
  formData: RegisterFormData
): RegisterFormErrors => {
  return {
    firstName: validateFirstName(formData.firstName),
    lastName: validateLastName(formData.lastName),
    email: validateEmail(formData.email),
    mobile: validateMobile(formData.mobile),
    parentName: validateParentName(formData.parentName),
    parentMobile: validateParentMobile(formData.parentMobile),
    state: validateState(formData.state),
    city: validateCity(formData.city),
    password: validatePassword(formData.password),
    confirmPassword: validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    ),
  };
};

/**
 * Check if form has errors
 */
export const hasErrors = (
  errors: LoginFormErrors | RegisterFormErrors
): boolean => {
  return Object.values(errors).some((error) => error !== undefined && error !== '');
};