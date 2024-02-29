import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Window = () => {

  // const [isOff, setIsOff] = useState(true);
  const [per, setPer] = useState()
  const [responseData, setResponseData] = useState(null);

  useEffect(()=>{
    console.log(per);
  },[per])
  
  const windowOpen = async () => {
    try {
      const response = await axios.post('http://172.30.1.48:8080/api/window/open');
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };

  const windowClose = async () => {
    try {
      const response = await axios.post('http://172.30.1.48:8080/api/window/close');
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };
  
  const controlWindow = async () =>{
    try{
      const response = await axios.post('http://172.30.1.48:8080/api/window/control', {per});
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('window control 중에 에러 발생', error);        
    }
  }

  const handleChange = (event) => {
    setPer(event.target.value);
  };

  return (
    <div className='window'>
      {/* <Header/> */}
      <h1>창문</h1>
      <h4>창문 열기</h4>

      <div>
        <input type="range" min={0} max={100} step={5} color='skyblue' onChange={handleChange}/>
        <button onClick={controlWindow}>{per}%</button>
      </div>
      <h4>창문 열고 닫기</h4>
      {/* <button onClick={()=>setIsOff(!isOff)}>{isOff?'ON':'OFF'}</button> */}
      <button onClick={windowOpen} className='button' >window open</button>
      <button onClick={windowClose} className='button'>window close</button>
      {responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>}
    </div>
  )
}

export default Window