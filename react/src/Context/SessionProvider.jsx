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
      const response = await axios.post('URL_DEL_BACKEND/login', credentials);
      setSession(response.data); // Guarda los datos de sesión (por ejemplo, token y usuario)
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
