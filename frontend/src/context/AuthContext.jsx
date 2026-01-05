import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    // Mock user data based on role
    let name = 'User';
    if (role === 'CLIENT') name = 'David Jegede';
    if (role === 'OFFICER') name = 'Sarah Jenkins';
    if (role === 'LEGAL') name = 'Barr. Michael Ross';

    const userData = {
      name,
      role,
      email: `${name.split(' ')[0].toLowerCase()}@example.com`,
    };
    setUser(userData);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
