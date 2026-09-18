import React, { useState } from 'react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import PasswordCriteria from '../../Components/Password_Criteria/PasswordCriteria';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic, validateSignUp } from '../../Logic/FormLogic';
import { passwordRules, usernameRules, emailRegex } from '../../Logic/ValidationRules';

const SignUp = () => {
  const { formData, errors, isLoading, handleChange, processSubmit } = useFormLogic({
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

  const handleSubmit = (e) => {
    processSubmit(e, () => {
      const { isValid, newErrors, showUsernameRules, showPasswordRules } = validateSignUp(formData, { usernameRules, passwordRules, emailRegex });
      if (showUsernameRules) setShowUsernameRules(true);
      if (showPasswordRules) setShowPasswordRules(true);
      return { isValid, newErrors };
    }, () => {
      console.log('SignUp Data:', { ...formData, phone: '+91' + formData.phone });
    });
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
