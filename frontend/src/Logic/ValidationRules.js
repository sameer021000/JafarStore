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
