// import React from 'react'
// import { Link , useNavigate } from "react-router-dom";
// import { Button } from 'react-bootstrap';
// import Socket from './Socket';
// import Window from './Window';
// import DoorLock from './DoorLock';
// import axios from 'axios';
// import GoingOutMode from './GoingOutMode';

// const Header = () => {            

//     const user = JSON.parse(sessionStorage.getItem('user'))
//     const handleLogOut = () => {
//       alert('로그아웃 되었습니다')
//       sessionStorage.removeItem('user')
//       window.location.href='/';
//     }

//     const sendToData = async()=>{
//       try{
//         axios.post('/user/delete', {user})
//         console.log('성공')
//       }catch(error){
//         console.error("data보내는중 에러 발생", error)
//       }
//     }
    

//   return (
//     <div className='header'>
//         <h3>{user.nick}님</h3>
        
//         <div className='style_header_WD'>
//           <Link to="/delete">
//             <Button variant="light" onClick={sendToData}>회원탈퇴</Button>
//           </Link>

//           <Link>
//             <Button variant='light' onClick={handleLogOut}>로그아웃</Button>
//           </Link>
//         </div>
//         <br></br>
//         <br></br>
//         <div className='style_WD'>
//           <Window/>
//           <DoorLock/>
//           <GoingOutMode/>
//         </div>
//     </div>
//   )
// }

// export default Header
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import GoingOutMode from './GoingOutMode';
import DoorLock from './DoorLock';
import Window from './Window';

const Header = () => {            

    const user = JSON.parse(sessionStorage.getItem('user'));
    const [showModal, setShowModal] = useState(false);

    const handleLogOut = () => {
        alert('로그아웃 되었습니다');
        sessionStorage.removeItem('user');
        window.location.href='/';
    }

    const handleDeleteAccount =  () => {
        try {
             axios.post('/user/delete', { user });
            setShowModal(false);
            alert('회원탈퇴가 완료되었습니다');
            sessionStorage.removeItem('user');
            window.location.href='/';
        } catch (error) {
            console.error("data보내는중 에러 발생", error);
        }
    }

    return (
        <div className='header'>
            <h3>{user.nick}님</h3>
            
            <div className='style_header_WD'>
                <Button variant="light" onClick={() => setShowModal(true)}>회원탈퇴</Button>
                
                <Link>
                    <Button variant='light' onClick={handleLogOut}>로그아웃</Button>
                </Link>
            </div>
            <br></br>
            <br></br>
            <div className='style_WD'>
                <Window/>
                <DoorLock/>
                <GoingOutMode/>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>회원탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>진짜 탈퇴하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        아니요
                    </Button>
                    <Button variant="primary" onClick={handleDeleteAccount}>
                        예
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Header;
