import React, { useState, type FormEvent, type ChangeEvent, type FocusEvent } from 'react';
import '../styles/Contactus.css';

// Type definitions
interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  city: string;
  pincode: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  state?: string;
  city?: string;
  pincode?: string;
}

interface TouchedFields {
  fullName?: boolean;
  email?: boolean;
  mobile?: boolean;
  state?: boolean;
  city?: boolean;
  pincode?: boolean;
}

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

type FormFieldName = keyof FormData;

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // Indian states list
  const indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // Validation functions
  const validateFullName = (name: string): string => {
    if (!name.trim()) {
      return 'Full name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name should contain only letters';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateMobile = (mobile: string): string => {
    if (!mobile.trim()) {
      return 'Mobile number is required';
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  };

  const validateState = (state: string): string => {
    if (!state) {
      return 'State is required';
    }
    return '';
  };

  const validateCity = (city: string): string => {
    if (!city.trim()) {
      return 'City is required';
    }
    if (city.trim().length < 2) {
      return 'City name must be at least 2 characters';
    }
    return '';
  };

  const validatePincode = (pincode: string): string => {
    if (pincode && !/^\d{6}$/.test(pincode)) {
      return 'Pincode must be 6 digits';
    }
    return '';
  };

  // Validate single field
  const validateField = (name: FormFieldName, value: string): string => {
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

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      state: validateState(formData.state),
      city: validateCity(formData.city),
      pincode: validatePincode(formData.pincode)
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as FormFieldName;
    
    // Allow only numbers for mobile and pincode
    if (fieldName === 'mobile' || fieldName === 'pincode') {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validate field if it has been touched
    if (touched[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: validateField(fieldName, value)
      }));
    }
  };

  // Handle blur (when user leaves a field)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    const fieldName = name as FormFieldName;
    
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    setErrors(prev => ({
      ...prev,
      [fieldName]: validateField(fieldName, value)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      state: true,
      city: true,
      pincode: true
    });

    // Validate form
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors before submitting'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically send data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      console.log('Form submitted:', formData);

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your form has been submitted successfully. We will contact you soon.'
      });

      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        state: '',
        city: '',
        pincode: ''
      });
      setTouched({});
      setErrors({});

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && touched.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              className={`form-input ${errors.mobile && touched.mobile ? 'error' : ''}`}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && touched.mobile && (
              <span className="error-message">{errors.mobile}</span>
            )}
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State <span className="required">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.state && touched.state ? 'error' : ''}`}
            >
              <option value="">Select your state</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && touched.state && (
              <span className="error-message">{errors.state}</span>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.city && touched.city ? 'error' : ''}`}
              placeholder="Enter your city"
            />
            {errors.city && touched.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>

          {/* Pincode */}
          <div className="form-group">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
              className={`form-input ${errors.pincode && touched.pincode ? 'error' : ''}`}
              placeholder="Enter 6-digit pincode (optional)"
            />
            {errors.pincode && touched.pincode && (
              <span className="error-message">{errors.pincode}</span>
            )}
          </div>

          {/* Submit Status Message */}
          {submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>abc@gmail.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>+91 1234567890</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>Pimpri, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;