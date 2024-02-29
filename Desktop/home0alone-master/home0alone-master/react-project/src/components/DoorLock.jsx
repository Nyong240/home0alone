

import Videos from './Videos';
import axios from '../axios'
import React, { useEffect, useState,useRef } from 'react';
import Header from './Header';
import VideoList from './VideoList';




const DoorLock = () => {

  const [isOff, setIsOff] = useState(true);
  const [videos, setVideos] = useState();


  // useEffect(()=>{
  //   console.log(per);
  // },[per])
  const [dw,setDw] = useState()
  const dwRef = useRef()
  const viewVideo = ()=>{
        let id = sessionStorage.getItem('user');

        axios.post('/video/videoDown', { id }).then(res => {
          const a = res.data
          const video = Object.values(a);
          const video1 = Object.entries(video)
          setVideos(video1[0][1])
          console.log(video1[0][1]);

  })
    
     
  }
  // useEffect(()=>{},[videos])

  return (    
    <div className='doorLock'>

      <h1>도어락</h1>
      <h4>문 열고 닫기</h4>
      <button className='button' onClick={()=>setIsOff(!isOff)}>{isOff?'ON':'OFF'}</button>
    
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


