import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ children, onClick, disabled, isLoading, type = 'submit', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`submit-btn ${className} ${isLoading ? 'is-loading' : ''}`}
      {...props}
    >
      {isLoading ? (
        <div className="modern-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : children}
    </button>
  );
};

export default SubmitButton;
