import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null); // Estado de sesión
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      const { token, user } = response.data;
      setSession({ token, user }); // Guarda el token y los datos del usuario en la sesión
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, login, logout, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
