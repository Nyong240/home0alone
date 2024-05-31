
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
            <h3 style={{color:'#e0d8d8f0'}}>{user.nick}님</h3>
            
            <div className='style_header_WD'>
                <Link style={{paddingRight:"10px"}}>
                    <Button className="button" variant="light" onClick={() => setShowModal(true)}>회원탈퇴</Button>
                </Link>
                <Link>
                    <Button className="button" variant='light' onClick={handleLogOut}>로그아웃</Button>
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
                <Modal.Body>탈퇴하시겠습니까?</Modal.Body>
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
