// aboutTypes.ts - Type definitions for About page

/**
 * Founder information
 */
export interface Founder {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

/**
 * About page section types
 */
export type AboutSection = 'mission' | 'vision' | 'founders' | 'values';

/**
 * Company values
 */
export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Statistics/Achievements
 */
export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon?: string;
}