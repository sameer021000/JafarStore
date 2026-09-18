import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import InputField from '../Input_Field/InputField';
import { loginMethods } from '../../Logic/ValidationRules';
import './CustomDropDown.css';

const CustomDropDown = ({ label, name, value, onChange, options, error, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt.value } });
    setIsOpen(false);
  };

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="dropdown-group" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}
      <div 
        className={`dropdown-field ${isOpen ? 'is-open' : ''} ${error ? 'dropdown-error' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        {...props}
      >
        <span className="dropdown-selected">{selectedOption ? selectedOption.label : 'Select...'}</span>
        <ChevronDown size={18} className={`dropdown-icon ${isOpen ? 'rotated' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-option ${opt.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CustomDropDown;

export const DynamicMethodSelector = ({ label, formData, setFormData, setErrors, handleChange, errors }) => {
  return (
    <div className="method-animation-wrapper">
      <CustomDropDown
        label={label}
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
    </div>
  );
};
