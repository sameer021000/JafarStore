import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import DynamicMethodSelector from '../../Components/Dynamic_Method_Selector/DynamicMethodSelector';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { validateIdentifier } from '../../Logic/ValidationRules';

const SignIn = () => {
  const { formData, setFormData, errors, setErrors, isLoading, handleChange, processSubmit } = useFormLogic({
    method: 'username',
    identifier: '',
    password: ''
  });

  const handleSubmit = (e) => {
    processSubmit(e, () => {
      const newErrors = {};
      const identifierError = validateIdentifier(formData.method, formData.identifier);
      if (identifierError) newErrors.identifier = identifierError;
      if (!formData.password.trim()) newErrors.password = 'Please enter your password';
      return { isValid: Object.keys(newErrors).length === 0, newErrors };
    }, () => {
      console.log('Login attempt:', { method: formData.method, value: formData.identifier });
    });
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
          <DynamicMethodSelector 
            label="Login Method"
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            handleChange={handleChange}
            errors={errors}
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
