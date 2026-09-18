import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Screens/SignIn/SignIn';
import SignUp from './Screens/SignUp/SignUp';
import ForgetPassword from './Screens/ForgetPassword/ForgetPassword';
import './App.css';

function App() {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
