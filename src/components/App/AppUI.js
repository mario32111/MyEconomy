import React from 'react';
import Loggin from '../Loggin/Loggin/Loggin'
import SignUp from '../SignUp/SignUp'
import Navbar from '../Landing/Navbar/Navbar'
import Home from '../Landing/Home/Home'




function AppUI() {

  return (
    <div>
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}

export { AppUI };
