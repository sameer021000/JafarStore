import React from 'react';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import DynamicMethodSelector from '../../Components/Dynamic_Method_Selector/DynamicMethodSelector';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { validateIdentifier } from '../../Logic/ValidationRules';

const ForgetPassword = () => {
  const { formData, errors, isLoading, handleChange, processSubmit } = useFormLogic({
    method: 'username',
    identifier: ''
  });

  const handleSubmit = (e) => {
    processSubmit(e, () => {
      const identifierError = validateIdentifier(formData.method, formData.identifier);
      return { 
        isValid: !identifierError, 
        newErrors: identifierError ? { identifier: identifierError } : {} 
      };
    }, () => {
      console.log('Password reset request for:', { method: formData.method, value: formData.identifier });
    });
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
            label="Reset Method"
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          
          <SubmitButton type="submit" className="mt-4" isLoading={isLoading}>Reset Password</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default ForgetPassword;
