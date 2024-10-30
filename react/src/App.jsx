import React from 'react';
import { SessionProvider } from './Context/SessionProvider.jsx';
import { useSession } from './hooks/useSession.js';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

const Main = () => {
  const { session } = useSession();

  return session ? <Home /> : <Login />;
};

function App() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

export default App;

