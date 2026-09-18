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
