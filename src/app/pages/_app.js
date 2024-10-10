// src/pages/_app.js

import { AuthProvider } from '../context/AuthContext'; // Make sure the path is correct
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
