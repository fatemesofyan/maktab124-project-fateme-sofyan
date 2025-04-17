// utils/validateLoginForm.js

export function validateLoginForm({ username, password }) {
  const errors = {};

  if (!username) {
    errors.username = "نام کاربری الزامی است.";
  } else if (username.length < 3) {
    errors.username = "نام کاربری باید حداقل ۳ حرف باشد.";
  } else if (!/^[\u0600-\u06FFa-zA-Z]+$/.test(username)) {
    errors.username = "نام کاربری فقط می‌تواند شامل حروف فارسی یا انگلیسی باشد.";
  }

  if (!password) {
    errors.password = "رمز عبور الزامی است.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
