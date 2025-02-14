export const getUserFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null; // Prevents JSON.parse(null) error
  return JSON.parse(userInfo).token;
};