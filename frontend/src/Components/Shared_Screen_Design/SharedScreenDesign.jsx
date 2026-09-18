import React from 'react';
import { Link } from 'react-router-dom';
import './SharedScreenDesign.css';

const SharedScreenDesign = ({ title, subtitle, children, footerText, footerLinkText, footerLinkTo }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        
        {children}
        
        {footerText && (
          <p className="auth-footer">
            {footerText} <Link to={footerLinkTo} className="signin-link">{footerLinkText}</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SharedScreenDesign;
