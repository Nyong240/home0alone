import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = () => { 
  const navigate = useNavigate();

    let logoCss = {
        width : "400px",
        height : "120px",
        paddingLeft : "50px"
    }
  return (
    <div >
        <img className="logo-img" onClick={()=>{navigate('/')}} src='./img/2440.png' style={logoCss}/>
      
    </div>
  )
}

export default Logo