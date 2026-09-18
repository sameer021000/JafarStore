import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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
