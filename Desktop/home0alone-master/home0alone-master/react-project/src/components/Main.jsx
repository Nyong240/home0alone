import React from 'react'
import { Card } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

// import Login from './Login'
// import SignUp from './SignUp'
import Left from './Left';
import Right from './Right';
// import Logo from './Logo';
// import DoorLock from './DoorLock';
// import Window from './Window';
// import MyPage from './MyPage';


const Main = () => {
  return (
    <div className='body'>
        {/* <Card> */}
          
          {/* <Card/> */}
            <Left/>
          {/* <Card/> */}

          {/* <Card> */}
            <Right/>
          {/* </Card> */}
            
        {/* </Card> */}
    </div>
  )
}

export default Main