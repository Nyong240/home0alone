

import Videos from './Videos';
import axios from '../axios'
import React, { useEffect, useState,useRef, useContext } from 'react';
import Header from './Header';
import VideoList from './VideoList';
import { SocketContext, flask_adress } from '../context/socket';




const DoorLock = () => {
  const adress = useContext(SocketContext)
  const flask_adress = adress.flask_adress

  const [isDoorLock, setIsDoorLock] = useState(false);
  const [videos, setVideos] = useState();
  const [responseData, setResponseData] = useState(null);
    let id = sessionStorage.getItem('user');

  useEffect(() => {
    axios.post('/values/Data', { id })
      .then((res) => {
        const DoorLockData = res.data.results[0];
        setIsDoorLock(DoorLockData.doorlock_current);
        
      })
      .catch(error => console.error('창문 데이터 가져오기 오류:', error));
  }, [id]);


  const [dw,setDw] = useState();
  const dwRef = useRef();

  const viewVideo = ()=>{
    let id = sessionStorage.getItem('user');

    axios.post('/video/videoDown', { id }).then(res => {
      const a = res.data
      const video = Object.values(a);
      const video1 = Object.entries(video)
      setVideos(video1[0][1])
      console.log(video1[0][1]);
    })     
  };

  // useEffect(()=>{},[videos])

  const doorOpen = async () => {
    try {
      // await axios.post('/values/doorLockOpen',{id,isDoorLock});
      // console.log('jh success');
      // setIsDoorLock(true)
      const response = await axios.post(`http://172.30.1.46:8080/api/door/unlock`);
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };

  const doorClose = async () => {
    try {
      axios.post('/values/doorLockClose',{id,isDoorLock});
      setIsDoorLock(false)
      const response = await axios.post(`http://172.30.1.46:8080/api/door/lock`);
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };



  return (    
    <div className='doorLock'>

      <h1>도어락</h1>
      {/* <h4>문 열고 닫기</h4> */}
      
      {/* <button className='button' onClick={()=>setIsOff(!isOff)}>{isOff?'ON':'OFF'}</button> */}
      <div>{isDoorLock? '문이 열려 있습니다': '문이 닫혀 있습니다'}</div>
      <button onClick={doorClose} className='button' >문 열기</button>
      <button onClick={doorOpen} className='button'>문 닫기</button>
      {/* {responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>} */}
      <br/>
      <h4>
        <button onClick={viewVideo} className='button'>비디오</button>
      </h4>

      {videos && videos.map((video) => (
        <VideoList key={video} video={video} />
      ))}
    </div>
  )
}
//disabled={!isDownloaded}
export default DoorLock


