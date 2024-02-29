import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import MemberList from './MemberList';

const Admin = () => {

  const user = JSON.parse(sessionStorage.getItem('user'))
  const [memberBool, setMemberBool] = useState(false)
  const handleLogOut = () => {
    alert('로그아웃 되었습니다')
    sessionStorage.removeItem('user')
    window.location.href='/';
  }

  const searchMemeber = ()=>{
    if(memberBool === false){
      setMemberBool(true);
    }else{
      setMemberBool(false)
    }
    
  }

  useEffect(()=>{
    console.log('memberBool : ',memberBool);
  },[memberBool])


  return (
    <div className='admin'>
      <div>
        <h3> 관리자 님</h3>
        <Button variant="light" onClick={searchMemeber}>회원정보</Button>
        <Button variant='light' onClick={handleLogOut}>로그아웃</Button>
      </div>
      <br/><br/>

      <div className= {memberBool ? 'adminMemberList' : ''}>
        {memberBool ? <MemberList /> : ''}
      </div>
</div>
  )
}

export default Admin