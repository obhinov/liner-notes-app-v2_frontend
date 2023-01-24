// ----- Imports -----
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './LoginPage'
import CreditsPage from './CreditsPage'

// ----- Main Function -----
export default function AppNav() {
  const auth_code = new URLSearchParams(window.location.search).get("code");

  return (
    <div className="AppNav">
      <Router>
        <Routes>
          <Route path='' element={<LoginPage />} />
          <Route path='home' element={<LoginPage />} />
          <Route path='callback' element={<CreditsPage spotify_auth_code={auth_code}/>} />
        </Routes>
      </Router>
    </div>
  );
}
// export default function AppNav() {
//   const auth_code = new URLSearchParams(window.location.search).get("code");

//   return (
//     <div className="AppNav">
//       {auth_code ? <CreditsPage spotify_auth_code={auth_code}/>:<LoginPage/>}
//     </div>
//   );
// }