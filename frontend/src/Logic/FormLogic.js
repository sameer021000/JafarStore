import { useState } from 'react';

export const useFormLogic = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone' || (name === 'identifier' && formData.method === 'phone')) {
      processedValue = value.replace(/[^0-9]/g, '');
      if (processedValue.length > 10) return;
      if (processedValue === formData[name]) return;
    }
    
    setFormData((prev) => {
      const newData = { ...prev, [name]: processedValue };
      if (name === 'method') {
        newData.identifier = '';
      }
      return newData;
    });
    
    if (name === 'method') {
      setErrors({});
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const processSubmit = (e, validationFn, successCallback) => {
    e.preventDefault();
    const { isValid, newErrors } = validationFn();
    
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      successCallback();
    }, 1500);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    handleChange,
    processSubmit
  };
};
