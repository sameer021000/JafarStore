import React from 'react';
import CustomDropDown from '../CustomDropDown/CustomDropDown';
import InputField from '../Input_Field/InputField';
import { loginMethods } from './MethodSelectorConstants';
import './DynamicMethodSelector.css';

const DynamicMethodSelector = ({ label, formData, handleChange, errors }) => {
  return (
    <div className="method-animation-wrapper">
      <CustomDropDown
        label={label}
        name="method"
        value={formData.method}
        onChange={handleChange}
        options={loginMethods}
      />
      
      <InputField
        label={loginMethods.find(m => m.value === formData.method)?.label}
        name="identifier"
        type={formData.method === 'mail' ? 'email' : 'text'}
        value={formData.identifier}
        onChange={handleChange}
        placeholder={`Enter your ${loginMethods.find(m => m.value === formData.method)?.label}`}
        prefix={formData.method === 'phone' ? '+91' : undefined}
        error={errors.identifier}
      />
    </div>
  );
};

export default DynamicMethodSelector;
