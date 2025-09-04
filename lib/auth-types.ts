// Authentication data types for sign in and sign up
export interface SignInData {
  email: string;
  password: string;
  timestamp: string;
  action: 'signin';
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  timestamp: string;
  action: 'signup';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: SignInData | SignUpData;
  errors?: string[];
}

// Form validation types
export interface FormErrors {
  [key: string]: string;
}

// Utility function to export auth data as JSON
export function exportAuthData(data: SignInData | SignUpData): string {
  return JSON.stringify(data, null, 2);
}

// Utility function to download JSON file
export function downloadJSON(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Form validation functions
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

export function validateFullName(fullName: string): string | null {
  if (!fullName) return 'Full name is required';
  if (fullName.length < 2) return 'Full name must be at least 2 characters';
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
}
