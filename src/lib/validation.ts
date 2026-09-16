export function validateName(value: string) {
  if (!value.trim()) return "This field is required.";
  return undefined;
}

export function validateEmail(value: string) {
  if (!value.trim()) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email.";
  return undefined;
}

export function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("61") ? `0${digits.slice(2)}` : digits;
  if (!/^04\d{8}$/.test(local)) {
    return "Please enter a mobile number for your confirmation text.";
  }
  return undefined;
}

export function isDetailsComplete(details: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  policyAccepted: boolean;
}) {
  return (
    !validateName(details.firstName) &&
    !validateName(details.lastName) &&
    !validateEmail(details.email) &&
    !validatePhone(details.phone) &&
    details.policyAccepted
  );
}
