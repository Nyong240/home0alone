import React, { useRef } from 'react'
import {Form, Button} from 'react-bootstrap';
import axios from '../axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const idRef = useRef();
  const pwRef = useRef();
  const gotoSignup = ()=>{
    
    navigate('/signup')
  };

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/user/login', {id:idRef.current.value, pw: pwRef.current.value}).then((res)=>{
      if(res.data.result === "success"){
        alert('로그인 성공')      

        sessionStorage.setItem('user',JSON.stringify(res.data.user));
        
        window.location.href='/';
      }
      else if(res.data.result === "admin"){
        sessionStorage.setItem('user',JSON.stringify(res.data.user));
        window.location.href='/';
      }
      else{
        alert('아이디 또는 비밀번호를 확인해주세요')
        navigate('/login')
      }
    });
  };


  
  return (
    <div className='login'>
      <h1>로그인</h1>
      <hr/>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicID">
        <Form.Label>ID</Form.Label>
        <Form.Control type="id" placeholder="Enter id" ref={idRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={pwRef}/>
      </Form.Group>
    
      <Form.Group style={{display:'flex', justifyContent:"space-around"}}>
        <Button variant="primary" type="submit" onSubmit={handleLogin}>
          로그인
        </Button>
        <Button variant="primary" type="submit" onClick={gotoSignup}> 
          회원가입
        </Button>
      </Form.Group>
    </Form>
    </div>
  );
}

export default Login
