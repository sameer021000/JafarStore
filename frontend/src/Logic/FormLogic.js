import { useState } from 'react';

export const useFormLogic = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9]/g, '');
      if (processedValue.length > 10) return;
      if (processedValue === formData[name]) return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    handleChange
  };
};

export const validateSignUp = (formData, rules) => {
  const { usernameRules, passwordRules, emailRegex } = rules;
  const newErrors = {};
  let showUsernameRules = false;
  let showPasswordRules = false;

  if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
  if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
  
  if (formData.phone.length !== 10) newErrors.phone = 'Phone number must be exactly 10 digits';

  if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email format required';

  const usernameValid = usernameRules.every(rule => rule.test(formData.username));
  if (!usernameValid) {
    newErrors.username = 'Please satisfy all username rules';
    showUsernameRules = true;
  }

  const passwordValid = passwordRules.every(rule => rule.test(formData.password));
  if (!passwordValid) {
    newErrors.password = 'Please satisfy all password rules';
    showPasswordRules = true;
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  return { isValid: Object.keys(newErrors).length === 0, newErrors, showUsernameRules, showPasswordRules };
};
