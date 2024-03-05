import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';

const Socket = () => {
  const socket = useContext(SocketContext);
  const [rcv_data, setdata] =useState('');

  useEffect(() => {
    
    const socketClient = socket.socket; // 수정: 서버의 주소와 포트를 지정

    // socketClient.on('connect', () => {
    //   console.log('Connected to server');
    // });

    socketClient.on('hello', (data) => {
      console.log('Received data from server:', data);
    });

    socketClient.on('doorLock', (data)=>{
      setdata(data.message)
      console.log(`받은 데이터 ${rcv_data}`)

    
    })
    
    return () => {
      socketClient.disconnect(); // 수정: 클라이언트 소켓 연결 해제
    };
  }, [rcv_data]);
  
  const handleReload = () => {
    window.location.reload(); // 새로고침을 트리거하기 위해 window 객체를 사용
  };


  const sendHello = () => {
    socket.socket.emit('hello', { message: 'Hello from client' });
  };

  return (
    <div className='socket container'>
      <button onClick={sendHello} className='button'>Send Hello</button> {/* 수정: 버튼 클릭 시 sendHello 함수 호출 */}
      <button onClick={handleReload} className='button'>Reload</button> {/* 새로고침 버튼 */}
    </div>
  );
};

export default Socket;
