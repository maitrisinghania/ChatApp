import './App.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

// components
import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';

function App() {

  const clientId = '587848433921-6o8ljhumpm1rapkiaqf19i7h0ol1mhbv.apps.googleusercontent.com';


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
