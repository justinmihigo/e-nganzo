import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Implement actual login logic here
    setUser({
      id: '1',
      name: 'Test User',
      email: email,
    });
    password
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
}; 