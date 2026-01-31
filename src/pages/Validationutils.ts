// validationUtils.ts - Type-safe validation utility functions

// validationUtils.ts - Type-safe validation utility functions
import type { FormData, FormErrors, FormFieldName } from './Types';

/**
 * Regular expression patterns for validation
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MOBILE: /^[6-9]\d{9}$/,
  PINCODE: /^\d{6}$/,
  LETTERS_ONLY: /^[a-zA-Z\s]+$/,
  NUMBERS_ONLY: /^\d+$/,
} as const;

/**
 * Validation error messages
 */
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_MOBILE: 'Please enter a valid 10-digit mobile number',
  INVALID_PINCODE: 'Pincode must be 6 digits',
  LETTERS_ONLY: 'This field should contain only letters',
  NUMBERS_ONLY: 'This field should contain only numbers',
} as const;

/**
 * Validates full name
 */
export const validateFullName = (name: string): string => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  if (trimmedName.length < 2) {
    return ERROR_MESSAGES.MIN_LENGTH(2);
  }
  
  if (trimmedName.length > 100) {
    return ERROR_MESSAGES.MAX_LENGTH(100);
  }
  
  if (!VALIDATION_PATTERNS.LETTERS_ONLY.test(trimmedName)) {
    return ERROR_MESSAGES.LETTERS_ONLY;
  }
  
  return '';
};

/**
 * Validates email address
 */
export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  if (!VALIDATION_PATTERNS.EMAIL.test(trimmedEmail)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  
  return '';
};

/**
 * Validates mobile number (Indian format)
 */
export const validateMobile = (mobile: string): string => {
  const trimmedMobile = mobile.trim();
  
  if (!trimmedMobile) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  if (!VALIDATION_PATTERNS.MOBILE.test(trimmedMobile)) {
    return ERROR_MESSAGES.INVALID_MOBILE;
  }
  
  return '';
};

/**
 * Validates state selection
 */
export const validateState = (state: string): string => {
  if (!state || !state.trim()) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  return '';
};

/**
 * Validates city name
 */
export const validateCity = (city: string): string => {
  const trimmedCity = city.trim();
  
  if (!trimmedCity) {
    return ERROR_MESSAGES.REQUIRED;
  }
  
  if (trimmedCity.length < 2) {
    return ERROR_MESSAGES.MIN_LENGTH(2);
  }
  
  if (trimmedCity.length > 100) {
    return ERROR_MESSAGES.MAX_LENGTH(100);
  }
  
  return '';
};

/**
 * Validates pincode (optional field)
 */
export const validatePincode = (pincode: string): string => {
  const trimmedPincode = pincode.trim();
  
  // Pincode is optional, so empty is valid
  if (!trimmedPincode) {
    return '';
  }
  
  if (!VALIDATION_PATTERNS.PINCODE.test(trimmedPincode)) {
    return ERROR_MESSAGES.INVALID_PINCODE;
  }
  
  return '';
};

/**
 * Validates a single field based on field name
 */
export const validateField = (name: FormFieldName, value: string): string => {
  switch (name) {
    case 'fullName':
      return validateFullName(value);
    case 'email':
      return validateEmail(value);
    case 'mobile':
      return validateMobile(value);
    case 'state':
      return validateState(value);
    case 'city':
      return validateCity(value);
    case 'pincode':
      return validatePincode(value);
    default:
      return '';
  }
};

/**
 * Validates entire form and returns all errors
 */
export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  // Validate each field
  (Object.keys(formData) as FormFieldName[]).forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

/**
 * Checks if form has any errors
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined && error !== '');
};

/**
 * Sanitizes input by trimming whitespace
 */
export const sanitizeInput = (value: string): string => {
  return value.trim();
};

/**
 * Sanitizes all form data
 */
export const sanitizeFormData = (formData: FormData): FormData => {
  const sanitized: FormData = {} as FormData;
  
  (Object.keys(formData) as FormFieldName[]).forEach((key) => {
    sanitized[key] = sanitizeInput(formData[key]);
  });
  
  return sanitized;
};

/**
 * Formats mobile number for display (e.g., 9876543210 -> +91 98765 43210)
 */
export const formatMobileNumber = (mobile: string): string => {
  if (mobile.length !== 10) return mobile;
  
  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
};

/**
 * Checks if a string contains only numbers
 */
export const isNumeric = (value: string): boolean => {
  return VALIDATION_PATTERNS.NUMBERS_ONLY.test(value);
};

/**
 * Type guard to check if a key is a valid FormFieldName
 */
export const isFormFieldName = (key: string): key is FormFieldName => {
  return ['fullName', 'email', 'mobile', 'state', 'city', 'pincode'].includes(key);
};