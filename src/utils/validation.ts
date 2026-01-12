// These are "pure functions" - they depend only on their input and produce no side effects.
// This makes them easy to test and reuse.

export const validateEmail = (email: string): boolean => {
  // Regex literal in JS/TS is defined between slashes /.../
  // This is similar to re.compile(r'...') in Python.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // .test() returns a boolean (true if match found), similar to bool(re.match(...))
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Checks for exactly 11 digits
  const phoneRegex = /^\d{11}$/;
  return phoneRegex.test(phone);
};
