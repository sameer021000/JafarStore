import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import PasswordCriteria from '../../Components/Password_Criteria/PasswordCriteria';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { passwordRules, usernameRules, emailRegex } from '../../Logic/ValidationRules';
import './SignUp.css';

const SignUp = () => {
  const { formData, errors, setErrors, isLoading, setIsLoading, handleChange } = useFormLogic({
    firstName: '',
    lastName: '',
    phone: '', 
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showUsernameRules, setShowUsernameRules] = useState(false);

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
    <SharedScreenDesign 
      title="Create Admin Account" 
      subtitle="Fill in the details to get started"
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerLinkTo="/signin"
    >
      <form onSubmit={handleSubmit} className="auth-form signup-form" noValidate>
        <div className="form-row">
          <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="John"
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Doe"
            />
          </div>
          
          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="Enter 10-digit number"
            prefix="+91"
          />
          
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="admin@jafarstore.com"
          />
          
          <div className="input-section">
            <InputField
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
              <PasswordCriteria value={formData.username} rules={usernameRules} />
            )}
          </div>
          
          <div className="input-section">
            <InputField
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
              <PasswordCriteria value={formData.password} rules={passwordRules} />
            )}
          </div>
          
          <InputField
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
    </SharedScreenDesign>
  );
};

export default SignUp;
