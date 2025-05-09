export const generatePassword = (length, charAllowed, numberAllowed) => {
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numberAllowed) charset += "0123456789";
  if (charAllowed) charset += "!@#$%&*";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * (charset.length + 1));
    password += charset[randomIndex];
  }
  return password;
};
