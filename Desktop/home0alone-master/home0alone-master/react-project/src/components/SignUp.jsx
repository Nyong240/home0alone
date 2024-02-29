import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from '../axios'
// import { useNavigate } from 'react-router-dom'

import DaumPostcode from 'react-daum-postcode';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko'; // 한국어 지원
import "react-datepicker/dist/react-datepicker.css";


// 성별이 필요한가?(userData 값으로 안 불러와짐(공란이여도 회원가입 가능)) 주소 폼을 만들어야 되나?
registerLocale('ko', ko)


const SignUp = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const idRef = useRef()
  const pwRef = useRef()
  const pw2Ref = useRef()
  const nameRef = useRef()
  const nicknameRef = useRef()
  const addressRef = useRef()
  const birthdateRef = useRef()

  const telephoneRef = useRef()

  const [userData, setUserData] = useState({});
  const [text, setText] = useState('');
  const [textNick, setTextNick] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  

  const checkId = ()=>{
    
    axios.post('/user/checkId', {id : idRef.current.value})
    .then((res)=>{
      if(res.data.result === 'dup'){
        setText('※ 이미 사용중인 아이디 입니다.')

      }
      else if(res.data.result === 'white'){
        setText('※ 아이디를 입력해주세요.')
      }
      else if(res.data.result === 'han'){
        setText('※ 한글은 불가능합니다. ')}
      else{
        setText('※ 사용 가능한 아이디입니다.')
      }
    })
  }
  const checkNick = ()=>{
    axios.post('/user/checkNick', {nick : nicknameRef.current.value})
    .then((res)=>{
      if(res.data.result === 'dup'){
        setTextNick('※ 이미 사용중인 닉네임 입니다.')

      }
      else if(res.data.result === 'white'){
        setTextNick('※ 닉네임을 입력해주세요.')
      }
      
      
      else{
        setTextNick('※ 사용 가능한 닉네임입니다.')
      }
    })
  }
 
  const handleJoin = (e)=>{

    e.preventDefault();


    setUserData({
      id : idRef.current.value,
      pw : pwRef.current.value,
      name : nameRef.current.value,
      nick : nicknameRef.current.value,
      addr: addressRef.current.value,
      birth: birthdateRef.current.value,
    //  gender: genderRef.current.value,
      tel : telephoneRef.current.value
    })
    
  }
  const handlePostcodeComplete = (data) => {
    
    addressRef.current.value = data.address;
};
  const handlePassword = (e) =>{
    setPassword(e.target.value);
    if(e.target.value === confirmPassword){
      setPasswordMessage('비밀번호가 같습니다');
    }
    else{
      setPasswordMessage('비밀번호를 확인해 주세요')
    }
  }
  const handleConfirm = (e) => {
    setConfirmPassword(e.target.value);
    if(e.target.value === password){
      setPasswordMessage('비밀번호가 같습니다');
    }
    else{
      setPasswordMessage('비밀번호를 확인해 주세요')
    }
  }

 useEffect(()=>{
  if(userData.id !== undefined){
    if(pwRef.current.value === pw2Ref.current.value){
      axios.post('/user/signup', {userData:userData})
      .then((res)=>{
        console.log('요청 성공!', res.data);

        let a = res.data.msg
        
        if(a === 'success'){
          window.alert('환영합니다!')
          window.location.href = '/'
          
        }
        else if(a === 'returnId'){
          window.alert('아이디를 확인해주세요.')
        }
        else if(a ==='conBirth'){
          window.alert('생년월일을 확인해주세요')
        }
        else if(a==='conTel'){
          window.alert('휴대폰 번호를 확인해주세요')
        }
        else if(a==='conNick'){
          window.alert('닉네임을 확인해주세요')
        }
        else{
          const korean = {"id":'아이디',
                          "pw":'비밀번호',
                          "name" : '이름',
                          "nick" : '닉네임',
                          "addr" : '주소',
                          "birth" : '생년월일',
                          "tel" : '전화번호'}
        
          window.alert(`${korean[a]}(을)를 입력하세요`)
        }
      })
    }
  }
 },[userData]);



  return (
    <div>
      <h1>회원가입</h1>
      <hr/>
      <Form onSubmit={handleJoin}>

        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text" placeholder="아이디" ref={idRef} style={{ borderColor: text === '※ 사용 가능한 아이디입니다.' ? 'blue' : 'red' }}/>
        </Form.Group>

        <div className='d-grid gap mb-3'>
          <Button variant='light' onClick={checkId}>중복체크</Button>
          {/* 아이디 중복여부에 따라 다른 내용 출력 */}
          <span style={{color:text === '※ 사용 가능한 아이디입니다.'? 'blue':'red'}}>{text}</span>
        </div>
        
        <Form.Group className="mb-3" controlId="formBasicPassWord1">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
          type="password" placeholder="비밀번호" ref={pwRef} onChange={handlePassword} style={{ borderColor: confirmPassword === password ? 'blue' : 'red' }}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassWord2">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
          type="password" placeholder="비밀번호 확인" ref={pw2Ref} onChange={handleConfirm} style={{ borderColor: confirmPassword === password ? 'blue' : 'red' }}/>
        </Form.Group>

        {/* 비밀번호1, 비밀번호2가 일치하지 않을 때 내용 출력 */}
        <span style={{color: confirmPassword === password? 'blue':'red'}}>{passwordMessage}</span>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이름</Form.Label>
          <Form.Control
          type="text" placeholder="이름 입력" ref={nameRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBirth">
          <Form.Label>생일</Form.Label>
          <Form.Control
          type="text" placeholder="YYYYMMDD" ref={birthdateRef}/>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicBirth">
            <Form.Label>생일</Form.Label>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="yyyyMMdd"
                locale="ko"
                placeholderText="YYYYMMDD"
                
            />
            <Form.Control ref={birthdateRef}></Form.Control>
        </Form.Group> */}
        
        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
          type="text" placeholder="-빼고 숫자만 입력" ref={telephoneRef}/>
        </Form.Group>
       
        
        <Form.Group className="mb-3" controlId="formBasicNick">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
          type="text" placeholder="Enter NickName" ref={nicknameRef}/>
        </Form.Group>
        <div className='d-grid gap mb-3'>
          <Button variant='light' onClick={checkNick}>중복체크</Button>
          <span style={{color:textNick === '※ 사용 가능한 닉네임입니다.'? 'blue':'red'}}>{textNick}</span>
        </div>

        {/* <Form.Group className="mb-3" controlId="formBasicAddr">
          <Form.Label></Form.Label>
          <Form.Control
          type="text" placeholder="Enter Address" ref={addressRef}/>
        </Form.Group> */}
       <Form.Group className="mb-3" controlId="formBasicAddr">
       <DaumPostcode onComplete={handlePostcodeComplete}/>
       {/* onComplete={handlePostcodeComplete} */}
                    <Form.Label>주소</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        ref={addressRef}
                    />
                    
                </Form.Group>

      
   

    

        <div className='d-grid gap mb-3'>
          <Button variant='info' type='submit' >회원가입</Button>
        </div>

      </Form>
    </div>
  )
}

export default SignUp
 