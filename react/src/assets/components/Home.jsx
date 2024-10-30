import React from 'react';
import useSession from '../hooks/useSession.js';

const Home = () => {
  const { session, logout } = useSession();

  return (
    <div>
      <h1>Bienvenido, {session?.user?.name}!</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;

