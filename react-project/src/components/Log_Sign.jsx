import React from 'react'
import { Card, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Log_Sign = () => {
    
  return (
    <>
    <Card.Body>
      <Nav variant="tabs">
        <Link to="/signup" style={{paddingRight:"10px"}}>
          <Button className="button"  variant="light">회원가입</Button>
        </Link>
        <Link to="/login">
          <Button className="button"  variant="light">로그인</Button>
        </Link>
      </Nav>
    </Card.Body>
   
    </>
  )
}

export default Log_Sign