// Validate email
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validate phone number
export const isValidPhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(String(phone)) && phone.replace(/\D/g, '').length >= 10;
};

// Validate required fields
export const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== '';
};