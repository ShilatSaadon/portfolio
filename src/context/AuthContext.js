import { createContext, useState } from 'react';
// Create a context for authentication state
export const AuthContext = createContext();

// This provider wraps the app and provides login/logout state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Function to simulate user login
  const login = () => setIsLoggedIn(true);
  // Function to simulate user logout
  const logout = () => { 
    setIsLoggedIn(false);
  }
  return (
    // Provide authentication state and methods to children components
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

