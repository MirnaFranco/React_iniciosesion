import React from 'react';
import { SessionProvider, useSession } from './Context/SessionProvider.jsx';
import Login from './components/Login';
import Home from './components/Home';

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

