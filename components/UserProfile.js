// Singleton reactive user profile
let userProfile = {
  userid: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+91 9876543210",
  avatar: require("../assets/avatars/avatar1.jpg"), // default avatar
  password: "123", // Plain password stored directly
};

// Listeners for reactive updates
let listeners = [];

// Get current profile
export const getUserProfile = () => {
  const { password, ...profileWithoutPassword } = userProfile; // Don't return password
  return profileWithoutPassword;
};

// Update profile and notify listeners
export const updateUserProfile = (newData) => {
  userProfile = { ...userProfile, ...newData };
  listeners.forEach((fn) => fn(userProfile));
};

// Set plain password directly
export const setPassword = (plainPassword) => {
  userProfile.password = plainPassword; // Store plain password directly
  listeners.forEach((fn) => fn(userProfile)); // Notify listeners about the update
};

// Verify if entered password matches the stored plain password
export const verifyPassword = (plainPassword) => {
  return plainPassword === userProfile.password;
};

// Subscribe to profile changes
export const subscribeProfile = (fn) => {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
};
