import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/Admin_Folder/SignIn_Folder/SignIn';
import SignUp from './pages/Admin_Folder/SignUp_Folder/SignUp';
import ForgetPassword from './pages/Admin_Folder/ForgetPassword_Folder/ForgetPassword';
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
