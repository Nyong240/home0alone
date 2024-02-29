import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Card } from "react-bootstrap";

import SignUp from './SignUp'
import DoorLock from './DoorLock'
import Window from './Window'
import Admin from './Admin';
import MemberList from './MemberList';
import Login from './Login';

const Right = () => {
  return (
    <div className='all'>
        {/* <Card> */}
            

            {/* <Card.Body> */}
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/> 
                    <Route path="/doorlock" element={<DoorLock/>}/>
                    <Route path="/window" element={<Window/>}/>
                    {/* <Route path="/admin" element={<Admin/>}/> */}
                    <Route path="/memberlist" element={<MemberList/>}/>
                </Routes>
            {/* </Card.Body> */}
        {/* </Card> */}
    </div>
  )
}

export default Right