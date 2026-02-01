// types.ts - Shared type definitions for the coaching website

/**
 * Form data structure for contact form
 */
export interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  pincode: string;
}

/**
 * Error messages for form validation
 */
export interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  state?: string;
  city?: string;
  pincode?: string;
}

/**
 * Tracks which fields have been touched/interacted with
 */
export interface TouchedFields {
  fullName?: boolean;
  email?: boolean;
  mobile?: boolean;
  state?: boolean;
  city?: boolean;
  pincode?: boolean;
}

/**
 * Status message for form submission
 */
export interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

/**
 * Type for form field names (type-safe key access)
 */
export type FormFieldName = keyof FormData;

/**
 * Indian states and union territories
 */
export type IndianState =
  | 'Andhra Pradesh'
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Bihar'
  | 'Chhattisgarh'
  | 'Goa'
  | 'Gujarat'
  | 'Haryana'
  | 'Himachal Pradesh'
  | 'Jharkhand'
  | 'Karnataka'
  | 'Kerala'
  | 'Madhya Pradesh'
  | 'Maharashtra'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Odisha'
  | 'Punjab'
  | 'Rajasthan'
  | 'Sikkim'
  | 'Tamil Nadu'
  | 'Telangana'
  | 'Tripura'
  | 'Uttar Pradesh'
  | 'Uttarakhand'
  | 'West Bengal'
  | 'Andaman and Nicobar Islands'
  | 'Chandigarh'
  | 'Dadra and Nagar Haveli and Daman and Diu'
  | 'Delhi'
  | 'Jammu and Kashmir'
  | 'Ladakh'
  | 'Lakshadweep'
  | 'Puducherry';

/**
 * Page routes for navigation
 */
export type PageType = 'home' | 'contact' | 'about';

/**
 * User role types
 */
export type UserRole = 'student' | 'teacher' | 'admin';

/**
 * User profile data
 */
export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatar?: string;
}

/**
 * Navbar props
 */
export interface NavbarProps {
  onNavigate?: (page: string) => void;
  user?: User | null;
}

/**
 * API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Contact form API response
 */
export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    submittedAt: string;
  };
}

/**
 * Validation function type
 */
export type ValidationFunction = (value: string) => string;

/**
 * Grade levels offered
 */
export type GradeLevel = '7' | '8' | '9' | '10';

/**
 * School medium types
 */
export type SchoolMedium = 'marathi' | 'english' | 'semi-english';

/**
 * Course information
 */
export interface Course {
  id: string;
  name: string;
  grade: GradeLevel;
  medium: SchoolMedium;
  description: string;
  duration: string;
  price: number;
}

/**
 * Student enrollment data
 */
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'cancelled';
}