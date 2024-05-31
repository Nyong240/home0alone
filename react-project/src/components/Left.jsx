import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Card } from "react-bootstrap";

import Logo from './Logo'
// import Login from './Login'
import Log_Sign from './Log_Sign';
import Header from './Header';
import Admin from './Admin';

const Left = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return (
    <div className='header'>
       
           <Logo/>
           {user && user.id==='admin'?(<Admin/>):user? (<Header/>):(<Log_Sign/>)}
          
        
    </div>
  )
}

export default Left