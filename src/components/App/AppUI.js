import React from 'react';
import Loggin from '../Loggin/Loggin/Loggin'
import SignUp from '../SignUp/SignUp' 
import NavbarHome from '../Landing/NavbarHome/NavbarHome'
import NavbarLoggin from '../Loggin/NavbarLoggin/NavbarLoggin'
import Home from '../Landing/Home/Home'
import { TodoContext } from '../TodoContext';



function AppUI() {
  const {
    openLoggin,
    openSignUp,
  } = React.useContext(TodoContext)

  return (
    <div>
      {!openLoggin && !openSignUp && (
        <>
          <NavbarHome />
          <Home />
        </>
      )}

      {openLoggin && (
        <>
          <NavbarLoggin />
          <Loggin />
        </>
      )}

      {openSignUp && (
        <>
          <NavbarLoggin />
          <SignUp />
        </>
      )}
    </div>
  );
}

export { AppUI };
