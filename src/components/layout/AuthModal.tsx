import React, { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import type {
    AuthMode,
    LoginFormData,
    RegisterFormData,
    LoginFormErrors,
    RegisterFormErrors,
    LoginTouchedFields,
    RegisterTouchedFields,
    AuthModalProps,
    LoginFieldName,
    RegisterFieldName,
} from '../../Types/authypes';
import {
  validateLoginField,
  validateRegisterField,
  validateLoginForm,
  validateRegisterForm,
  hasErrors,
} from '../../validations/AuthValidation';
import '../../styles/AuthModal.css';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Login form state
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});
  const [loginTouched, setLoginTouched] = useState<LoginTouchedFields>({});

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    parentName: '',
    parentMobile: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterFormErrors>({});
  const [registerTouched, setRegisterTouched] = useState<RegisterTouchedFields>({});

  // Indian states
  const indianStates: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

  // Handle modal close
  const handleClose = (): void => {
    if (!isSubmitting) {
      onClose();
      // Reset forms after closing
      setTimeout(() => {
        setMode(initialMode);
        setLoginData({ email: '', password: '' });
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          parentName: '',
          parentMobile: '',
          state: '',
          city: '',
          password: '',
          confirmPassword: '',
        });
        setLoginErrors({});
        setRegisterErrors({});
        setLoginTouched({});
        setRegisterTouched({});
        setSubmitMessage(null);
      }, 300);
    }
  };

  // Login form handlers
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as LoginFieldName;

    setLoginData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (loginTouched[fieldName]) {
      setLoginErrors((prev) => ({
        ...prev,
        [fieldName]: validateLoginField(fieldName, value),
      }));
    }
  };

  const handleLoginBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as LoginFieldName;

    setLoginTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    setLoginErrors((prev) => ({
      ...prev,
      [fieldName]: validateLoginField(fieldName, value),
    }));
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setLoginTouched({
      email: true,
      password: true,
    });

    const errors = validateLoginForm(loginData);
    setLoginErrors(errors);

    if (hasErrors(errors)) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fix the errors before submitting',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login
      console.log('Login data:', loginData);

      setSubmitMessage({
        type: 'success',
        text: 'Login successful! Redirecting...',
      });

      // Simulate login success
      if (onLoginSuccess) {
        onLoginSuccess({
          id: '1',
          email: loginData.email,
          fullName: 'Student Name',
          mobile: '9876543210',
          role: 'student',
        });
      }

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Invalid email or password',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Register form handlers
  const handleRegisterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const fieldName = name as RegisterFieldName;

    // Allow only numbers for mobile fields
    if (fieldName === 'mobile' || fieldName === 'parentMobile') {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }

    setRegisterData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (registerTouched[fieldName]) {
      setRegisterErrors((prev) => ({
        ...prev,
        [fieldName]: validateRegisterField(fieldName, value, registerData),
      }));
    }
  };

  const handleRegisterBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const fieldName = name as RegisterFieldName;

    setRegisterTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    setRegisterErrors((prev) => ({
      ...prev,
      [fieldName]: validateRegisterField(fieldName, value, registerData),
    }));
  };

  const handleRegisterSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setRegisterTouched({
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      parentName: true,
      parentMobile: true,
      state: true,
      city: true,
      password: true,
      confirmPassword: true,
    });

    const errors = validateRegisterForm(registerData);
    setRegisterErrors(errors);

    if (hasErrors(errors)) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fix the errors before submitting',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Register data:', registerData);

      setSubmitMessage({
        type: 'success',
        text: 'Registration successful! Please login.',
      });

      setTimeout(() => {
        setMode('login');
        setSubmitMessage(null);
      }, 1500);
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Registration failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="auth-backdrop" onClick={handleClose}></div>

      {/* Modal Sidebar/Centered */}
      <div className={`auth-modal ${mode === 'register' ? 'centered' : ''} ${isOpen ? 'open' : ''}`}>
        <button className="auth-close-btn" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {/* Login Form */}
        {mode === 'login' && (
          <div className="auth-content">
            <div className="auth-header">
              <h2>Login to Your Account</h2>
              <p>Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="auth-form">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  Email ID
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                  className={`form-input ${
                    loginErrors.email && loginTouched.email ? 'error' : ''
                  }`}
                  placeholder="Enter your email"
                />
                {loginErrors.email && loginTouched.email && (
                  <span className="error-message">{loginErrors.email}</span>
                )}
                <a
                  href="#"
                  className="form-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode('otp');
                  }}
                >
                  Login via OTP
                </a>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                  className={`form-input ${
                    loginErrors.password && loginTouched.password ? 'error' : ''
                  }`}
                  placeholder="Enter your password"
                />
                {loginErrors.password && loginTouched.password && (
                  <span className="error-message">{loginErrors.password}</span>
                )}
                <a
                  href="#"
                  className="form-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode('forgot-password');
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Terms & Conditions */}
              <p className="terms-note">
                By continuing, you agree to our{' '}
                <a href="#" className="terms-link">
                  Terms & Conditions
                </a>
              </p>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`submit-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Register Link */}
              <p className="auth-switch">
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode('register');
                    setSubmitMessage(null);
                  }}
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <div className="auth-content">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Register to create your account</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="auth-form">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="register-firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="register-firstName"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.firstName && registerTouched.firstName ? 'error' : ''
                  }`}
                  placeholder="Enter your first name"
                />
                {registerErrors.firstName && registerTouched.firstName && (
                  <span className="error-message">{registerErrors.firstName}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="register-lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="register-lastName"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.lastName && registerTouched.lastName ? 'error' : ''
                  }`}
                  placeholder="Enter your last name"
                />
                {registerErrors.lastName && registerTouched.lastName && (
                  <span className="error-message">{registerErrors.lastName}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="register-email" className="form-label">
                  Email ID <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.email && registerTouched.email ? 'error' : ''
                  }`}
                  placeholder="Enter your email"
                />
                {registerErrors.email && registerTouched.email && (
                  <span className="error-message">{registerErrors.email}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="register-mobile" className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="register-mobile"
                  name="mobile"
                  value={registerData.mobile}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  maxLength={10}
                  className={`form-input ${
                    registerErrors.mobile && registerTouched.mobile ? 'error' : ''
                  }`}
                  placeholder="Enter 10-digit mobile number"
                />
                {registerErrors.mobile && registerTouched.mobile && (
                  <span className="error-message">{registerErrors.mobile}</span>
                )}
              </div>

              {/* Parent Name */}
              <div className="form-group">
                <label htmlFor="register-parentName" className="form-label">
                  Parent Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="register-parentName"
                  name="parentName"
                  value={registerData.parentName}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.parentName && registerTouched.parentName
                      ? 'error'
                      : ''
                  }`}
                  placeholder="Enter parent's name"
                />
                {registerErrors.parentName && registerTouched.parentName && (
                  <span className="error-message">
                    {registerErrors.parentName}
                  </span>
                )}
              </div>

              {/* Parent Mobile Number */}
              <div className="form-group">
                <label htmlFor="register-parent-mobile" className="form-label">
                  Parent Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="register-parent-mobile"
                  name="parentMobile"
                  value={registerData.parentMobile}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  maxLength={10}
                  className={`form-input ${
                    registerErrors.parentMobile && registerTouched.parentMobile
                      ? 'error'
                      : ''
                  }`}
                  placeholder="Enter parent's mobile number"
                />
                {registerErrors.parentMobile && registerTouched.parentMobile && (
                  <span className="error-message">
                    {registerErrors.parentMobile}
                  </span>
                )}
              </div>

              {/* State */}
              <div className="form-group">
                <label htmlFor="register-state" className="form-label">
                  State <span className="required">*</span>
                </label>
                <select
                  id="register-state"
                  name="state"
                  value={registerData.state}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.state && registerTouched.state ? 'error' : ''
                  }`}
                >
                  <option value="">Select your state</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {registerErrors.state && registerTouched.state && (
                  <span className="error-message">{registerErrors.state}</span>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="register-city" className="form-label">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="register-city"
                  name="city"
                  value={registerData.city}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.city && registerTouched.city ? 'error' : ''
                  }`}
                  placeholder="Enter your city"
                />
                {registerErrors.city && registerTouched.city && (
                  <span className="error-message">{registerErrors.city}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="register-password" className="form-label">
                  Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.password && registerTouched.password
                      ? 'error'
                      : ''
                  }`}
                  placeholder="Create a strong password"
                />
                {registerErrors.password && registerTouched.password && (
                  <span className="error-message">{registerErrors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="register-confirm-password" className="form-label">
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="register-confirm-password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  className={`form-input ${
                    registerErrors.confirmPassword &&
                    registerTouched.confirmPassword
                      ? 'error'
                      : ''
                  }`}
                  placeholder="Confirm your password"
                />
                {registerErrors.confirmPassword &&
                  registerTouched.confirmPassword && (
                    <span className="error-message">
                      {registerErrors.confirmPassword}
                    </span>
                  )}
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`submit-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </button>

              {/* Login Link */}
              <p className="auth-switch">
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode('login');
                    setSubmitMessage(null);
                  }}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        )}

        {/* OTP Mode Placeholder */}
        {mode === 'otp' && (
          <div className="auth-content">
            <div className="auth-header">
              <h2>Login via OTP</h2>
              <p>Enter your email to receive OTP</p>
            </div>
            <button
              className="back-btn"
              onClick={() => setMode('login')}
            >
              ← Back to Login
            </button>
          </div>
        )}

        {/* Forgot Password Placeholder */}
        {mode === 'forgot-password' && (
          <div className="auth-content">
            <div className="auth-header">
              <h2>Forgot Password</h2>
              <p>Enter your email to reset password</p>
            </div>
            <button
              className="back-btn"
              onClick={() => setMode('login')}
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthModal;