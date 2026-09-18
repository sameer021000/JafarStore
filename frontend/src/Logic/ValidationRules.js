export const passwordRules = [
  { id: 'length', label: '8-15 characters', test: (val) => val.length >= 8 && val.length <= 15 },
  { id: 'upper', label: 'One uppercase letter', test: (val) => /[A-Z]/.test(val) },
  { id: 'lower', label: 'One lowercase letter', test: (val) => /[a-z]/.test(val) },
  { id: 'num', label: 'One number', test: (val) => /\d/.test(val) },
  { id: 'special', label: 'One special character', test: (val) => /[@$!%*?&]/.test(val) },
];

export const usernameRules = [
  { id: 'length', label: '6-10 characters', test: (val) => val.length >= 6 && val.length <= 10 },
  { id: 'alpha', label: 'At least one letter', test: (val) => /[a-zA-Z]/.test(val) },
  { id: 'num', label: 'At least one number', test: (val) => /\d/.test(val) },
  { id: 'format', label: 'Only letters and numbers', test: (val) => /^[a-zA-Z0-9]+$/.test(val) },
];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginMethods = [
  { label: 'Username', value: 'username' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Mail ID', value: 'mail' },
];

export const validateIdentifier = (method, identifier) => {
  if (!identifier.trim()) return `Please enter your ${loginMethods.find(m => m.value === method).label}`;
  if (method === 'phone' && identifier.length !== 10) return 'Phone number must be exactly 10 digits';
  if (method === 'mail' && !emailRegex.test(identifier)) return 'Valid email format required';
  if (method === 'username') {
    const usernameValid = usernameRules.every(rule => rule.test(identifier));
    if (!usernameValid) return 'Please satisfy all username rules';
  }
  return null;
};

export const validateSignUp = (formData) => {
  const newErrors = {};
  let showUsernameRules = false;
  let showPasswordRules = false;

  if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
  if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
  
  if (formData.phone.length !== 10) newErrors.phone = 'Phone number must be exactly 10 digits';

  if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email format required';

  const usernameValid = usernameRules.every(rule => rule.test(formData.username));
  if (!usernameValid) {
    newErrors.username = 'Please satisfy all username rules';
    showUsernameRules = true;
  }

  const passwordValid = passwordRules.every(rule => rule.test(formData.password));
  if (!passwordValid) {
    newErrors.password = 'Please satisfy all password rules';
    showPasswordRules = true;
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }

  return { isValid: Object.keys(newErrors).length === 0, newErrors, showUsernameRules, showPasswordRules };
};
