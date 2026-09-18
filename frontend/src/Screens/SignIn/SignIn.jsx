import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import CustomDropDown from '../../Components/CustomDropDown/CustomDropDown';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { loginMethods, validateIdentifier } from '../../Logic/ValidationRules';
import './SignIn.css';

const SignIn = () => {
  const { formData, setFormData, errors, setErrors, isLoading, setIsLoading, handleChange } = useFormLogic({
    method: 'username',
    identifier: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    const identifierError = validateIdentifier(formData.method, formData.identifier);
    if (identifierError) newErrors.identifier = identifierError;
    
    if (!formData.password.trim()) newErrors.password = 'Please enter your password';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { method: formData.method, value: formData.identifier });
    }, 1500);
  };

  return (
    <SharedScreenDesign 
      title="Welcome Back" 
      subtitle="Sign in to your Admin account"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <CustomDropDown
            label="Login Method"
            name="method"
            value={formData.method}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, method: e.target.value, identifier: '' }));
              setErrors({});
            }}
            options={loginMethods}
          />
          
          <InputField
            label={loginMethods.find(m => m.value === formData.method)?.label}
            name="identifier"
            type={formData.method === 'mail' ? 'email' : 'text'}
            value={formData.identifier}
            onChange={(e) => {
              if (formData.method === 'phone') {
                const processed = e.target.value.replace(/[^0-9]/g, '');
                if (processed.length > 10) return;
                e.target.value = processed;
              }
              handleChange(e);
            }}
            placeholder={`Enter your ${loginMethods.find(m => m.value === formData.method)?.label}`}
            prefix={formData.method === 'phone' ? '+91' : undefined}
            error={errors.identifier}
          />
          
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            isPassword={true}
            defaultVisible={false}
          />
          
          <div className="auth-actions">
            <Link to="/forget-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
          
          <SubmitButton type="submit" isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default SignIn;
