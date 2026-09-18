import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Input.css';

const Input = ({ label, type = 'text', name, value, onChange, error, placeholder, prefix, isPassword, defaultVisible = false, ...props }) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const inputType = isPassword ? (isVisible ? 'text' : 'password') : type;

  return (
    <div className="input-group">
      {label && <label htmlFor={name} className="input-label">{label}</label>}
      <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input-field ${prefix ? 'has-prefix' : ''} ${isPassword ? 'has-password-toggle' : ''}`}
          {...props}
        />
        {!value && placeholder && (
          <span key={placeholder} className={`custom-placeholder ${prefix ? 'has-prefix' : ''}`}>
            {placeholder}
          </span>
        )}
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setIsVisible(!isVisible)}
            tabIndex={-1}
            title={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={14} className="error-icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
