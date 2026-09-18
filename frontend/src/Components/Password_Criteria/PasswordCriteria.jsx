import React from 'react';
import { Check, X } from 'lucide-react';
import './PasswordCriteria.css';

const PasswordCriteria = ({ value, rules }) => {
  return (
    <div className="validation-checklist">
      {rules.map(rule => (
        <div key={rule.id} className={`checklist-item ${rule.test(value) ? 'valid' : 'invalid'}`}>
          {rule.test(value) ? <Check size={14} /> : <X size={14} />}
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordCriteria;
