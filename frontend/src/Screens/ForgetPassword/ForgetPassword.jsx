import React from 'react';
import InputField from '../../Components/Input_Field/InputField';
import SubmitButton from '../../Components/Submit_Button/SubmitButton';
import CustomDropDown from '../../Components/CustomDropDown/CustomDropDown';
import SharedScreenDesign from '../../Components/Shared_Screen_Design/SharedScreenDesign';
import { useFormLogic } from '../../Logic/FormLogic';
import { emailRegex, usernameRules, loginMethods } from '../../Logic/ValidationRules';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const { formData, setFormData, errors, setErrors, isLoading, setIsLoading, handleChange } = useFormLogic({
    method: 'username',
    identifier: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    
    if (!formData.identifier.trim()) {
      setErrors({ identifier: `Please enter your ${loginMethods.find(m => m.value === formData.method).label}` });
      hasError = true;
    } else {
      if (formData.method === 'phone' && formData.identifier.length !== 10) {
        setErrors({ identifier: 'Phone number must be exactly 10 digits' });
        hasError = true;
      } else if (formData.method === 'mail' && !emailRegex.test(formData.identifier)) {
        setErrors({ identifier: 'Valid email format required' });
        hasError = true;
      } else if (formData.method === 'username') {
        const usernameValid = usernameRules.every(rule => rule.test(formData.identifier));
        if (!usernameValid) {
          setErrors({ identifier: 'Please satisfy all username rules' });
          hasError = true;
        }
      }
    }
    
    if (hasError) return;
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
          <CustomDropDown
            label="Verification Method"
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
          
          <SubmitButton type="submit" className="mt-4" isLoading={isLoading}>Reset Password</SubmitButton>
      </form>
    </SharedScreenDesign>
  );
};

export default ForgetPassword;
