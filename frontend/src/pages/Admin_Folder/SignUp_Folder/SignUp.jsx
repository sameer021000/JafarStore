import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Input from '../../../components/Form_Folder/Input_Folder/Input';
import SubmitButton from '../../../components/Form_Folder/Button_Folder/SubmitButton';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '', 
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showUsernameRules, setShowUsernameRules] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRules = [
    { id: 'length', label: '8-15 characters', test: (val) => val.length >= 8 && val.length <= 15 },
    { id: 'upper', label: 'One uppercase letter', test: (val) => /[A-Z]/.test(val) },
    { id: 'lower', label: 'One lowercase letter', test: (val) => /[a-z]/.test(val) },
    { id: 'num', label: 'One number', test: (val) => /\d/.test(val) },
    { id: 'special', label: 'One special character', test: (val) => /[@$!%*?&]/.test(val) },
  ];

  const usernameRules = [
    { id: 'length', label: '6-10 characters', test: (val) => val.length >= 6 && val.length <= 10 },
    { id: 'alpha', label: 'At least one letter', test: (val) => /[a-zA-Z]/.test(val) },
    { id: 'num', label: 'At least one number', test: (val) => /\d/.test(val) },
    { id: 'format', label: 'Only letters and numbers', test: (val) => /^[a-zA-Z0-9]+$/.test(val) },
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email format required';
    }

    const usernameValid = usernameRules.every(rule => rule.test(formData.username));
    if (!usernameValid) {
      newErrors.username = 'Please satisfy all username rules';
      setShowUsernameRules(true); 
    }

    const passwordValid = passwordRules.every(rule => rule.test(formData.password));
    if (!passwordValid) {
      newErrors.password = 'Please satisfy all password rules';
      setShowPasswordRules(true); 
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9]/g, '');
      if (processedValue.length > 10) return;
      if (processedValue === formData.phone) return; // Prevent clearing error if non-numeric typed
    }
    
    setFormData({ ...formData, [name]: processedValue });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log('SignUp Data:', { ...formData, phone: '+91' + formData.phone });
      }, 1500); // Simulate network request
    }
  };

  return (
    <div className="auth-container signup-container">
      <div className="auth-card signup-card">
        <h2 className="auth-title">Create Admin Account</h2>
        <p className="auth-subtitle">Fill in the details to get started</p>
        
        <form onSubmit={handleSubmit} className="auth-form signup-form" noValidate>
          <div className="form-row">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="John"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Doe"
            />
          </div>
          
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="Enter 10-digit number"
            prefix="+91"
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="admin@jafarstore.com"
          />
          
          <div className="input-section">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setShowUsernameRules(true)}
              onBlur={() => {
                if (usernameRules.every(r => r.test(formData.username))) setShowUsernameRules(false);
              }}
              error={errors.username}
              placeholder="johndoe123"
            />
            
            {showUsernameRules && (
              <div className="validation-checklist">
                {usernameRules.map(rule => (
                  <div key={rule.id} className={`checklist-item ${rule.test(formData.username) ? 'valid' : 'invalid'}`}>
                    {rule.test(formData.username) ? <Check size={14} /> : <X size={14} />}
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="input-section">
            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => {
                if (passwordRules.every(r => r.test(formData.password))) setShowPasswordRules(false);
              }}
              error={errors.password}
              placeholder="••••••••"
              isPassword={true}
              defaultVisible={true}
            />
            {showPasswordRules && (
              <div className="validation-checklist">
                {passwordRules.map(rule => (
                  <div key={rule.id} className={`checklist-item ${rule.test(formData.password) ? 'valid' : 'invalid'}`}>
                    {rule.test(formData.password) ? <Check size={14} /> : <X size={14} />}
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Input
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            isPassword={true}
            defaultVisible={false}
          />
          
          <SubmitButton type="submit" className="mt-4" isLoading={isLoading}>Sign Up</SubmitButton>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/signin" className="signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
