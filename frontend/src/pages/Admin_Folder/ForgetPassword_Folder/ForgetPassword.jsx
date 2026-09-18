import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/Form_Folder/Input_Folder/Input';
import Dropdown from '../../../components/Form_Folder/Dropdown_Folder/Dropdown';
import SubmitButton from '../../../components/Form_Folder/Button_Folder/SubmitButton';
import './ForgetPassword.css';

const loginMethods = [
  { label: 'Username', value: 'username' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Mail ID', value: 'mail' },
];

const ForgetPassword = () => {
  const [method, setMethod] = useState('username');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(`Please enter your ${method}`);
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Password reset request for:', { method, value: inputValue });
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">No worries, we'll send you reset instructions.</p>
        
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <Dropdown
            label="Verification Method"
            name="method"
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setInputValue('');
              setError('');
            }}
            options={loginMethods}
          />
          
          <Input
            label={loginMethods.find(m => m.value === method)?.label}
            name="identifier"
            type={method === 'mail' ? 'email' : 'text'}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError('');
            }}
            placeholder={`Enter your ${method}`}
            error={error}
          />
          
          <SubmitButton type="submit" className="mt-4" isLoading={isLoading}>Reset Password</SubmitButton>
        </form>
        
        <p className="auth-footer">
          Remember password? <Link to="/signin" className="signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
