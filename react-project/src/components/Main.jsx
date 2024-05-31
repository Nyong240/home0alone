import React from 'react'
import { Card } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";


import Left from './Left';
import Right from './Right';



const Main = () => {
  return (
    <div className='body'>
        
            <Left/>
       
            <Right/>
        
    </div>
  )
}

export default Main