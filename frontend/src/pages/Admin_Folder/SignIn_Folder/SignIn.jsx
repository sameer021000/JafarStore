import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/Form_Folder/Input_Folder/Input';
import Dropdown from '../../../components/Form_Folder/Dropdown_Folder/Dropdown';
import SubmitButton from '../../../components/Form_Folder/Button_Folder/SubmitButton';
import './SignIn.css';

const loginMethods = [
  { label: 'Username', value: 'username' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Mail ID', value: 'mail' },
];

const SignIn = () => {
  const [method, setMethod] = useState('username');
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!inputValue.trim()) newErrors.identifier = `Please enter your ${method}`;
    if (!password.trim()) newErrors.password = 'Please enter your password';
    
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    
    setError({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { method, value: inputValue });
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your Admin account</p>
        
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <Dropdown
            label="Login Method"
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
              if (error.identifier) setError(prev => ({ ...prev, identifier: '' }));
            }}
            placeholder={`Enter your ${method}`}
            error={error.identifier}
          />
          
          <Input
            label="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error.password) setError(prev => ({ ...prev, password: '' }));
            }}
            placeholder="••••••••"
            error={error.password}
            isPassword={true}
            defaultVisible={false}
          />
          
          <div className="auth-actions">
            <Link to="/forget-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
          
          <SubmitButton type="submit" isLoading={isLoading}>Sign In</SubmitButton>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
