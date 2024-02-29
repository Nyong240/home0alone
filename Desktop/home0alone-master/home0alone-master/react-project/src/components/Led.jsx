import React, { useContext, useRef, useState } from 'react';
import axios from 'axios'


function Led() {
    const [responseData, setResponseData] = useState(null);
  
    const turnOnLED = async () => {
      try {
        const response = await axios.post('http://59.0.124.204:5050/api/led/on');
        console.log("성공")
        setResponseData(response.data);
        console.log(response.data); // 응답 확인
      } catch (error) {
        console.error('LED를 켜는 중 오류 발생:', error);
      }
    };
  
    const turnOffLED = async () => {
      try {
        const response = await axios.post('http://59.0.124.204:5050/api/led/off');
        setResponseData(response.data);
        console.log(response.data); // 응답 확인
        console.log(responseData)
      } catch (error) {
        console.error('LED를 끄는 중 오류 발생:', error);
      }
    };

    return (
      <div className='led container'>
        <button onClick={turnOnLED} className='button'>LED 켜기</button>
        <button onClick={turnOffLED} className='button'>LED 끄기</button>

        {responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>}
      </div>
    );
  }

export default Led


