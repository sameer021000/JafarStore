import React from 'react';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import { DynamicMethodSelector } from '../../Components/CustomDropDown/CustomDropDown';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { validateIdentifier } from '../../Logic/ValidationRules';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const { formData, setFormData, errors, setErrors, isLoading, setIsLoading, handleChange } = useFormLogic({
    method: 'username',
    identifier: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const identifierError = validateIdentifier(formData.method, formData.identifier);
    if (identifierError) {
      setErrors({ identifier: identifierError });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Password reset request for:', { method: formData.method, value: formData.identifier });
    }, 1500);
  };

  return (
    <SharedScreenDesign 
      title="Forgot Password?" 
      subtitle="No worries, we'll send you reset instructions."
      footerText="Remember password?"
      footerLinkText="Sign In"
      footerLinkTo="/signin"
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <DynamicMethodSelector 
            label="Verification Method"
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            handleChange={handleChange}
            errors={errors}
          />
          
          <SubmitButton type="submit" className="mt-4" isLoading={isLoading}>Reset Password</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default ForgetPassword;
