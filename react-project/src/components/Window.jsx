import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Window = () => {

  const [per, setPer] = useState(0);
  const [responseData, setResponseData] = useState(null);
  const [isWindow,setIsWindow] = useState(false);
  
 

  let id = sessionStorage.getItem('user');

  useEffect(() => {
    axios.post('/values/Data', { id })
      .then((res) => {
        const windowData = res.data.results[0];
        console.log(windowData);
        setIsWindow(windowData.window_current);
        setPer(windowData.window_value);
      })
      .catch(error => console.error('창문 데이터 가져오기 오류:', error));
  }, [id]);

 
  const windowOpen = async () => {
    try {
      
      const response = await axios.post('http://172.30.1.46:8080/api/window/open');
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };

  const windowClose = async () => {
    try {
      axios.post('/values/windowClose',{id,isWindow});
      setIsWindow(false)
      const response = await axios.post('http://172.30.1.46:8080/api/window/close');
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data); // 응답 확인
    } catch (error) {
      console.error('window켜는중에 에러 발생', error);
    }
  };
  
  const controlWindow = async () =>{
    try{
      axios.post('/values/windowPer',{id,per});
      console.log(per);
      const response = await axios.post('http://172.30.1.46:8080/api/window/control', {data : {per}});
      console.log("성공")
      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('window control 중에 에러 발생', error);        
    }
  };

  const handleChange = (event) => {
    setPer(event.target.value);
  };


  return (
    <div className='window'>
    
      <h1>창문</h1>
   
      <br/>
      <div>
        <input type="range" min={0} max={100} step={5} className='range' onChange={handleChange}/>
        <button className='btn' onClick={controlWindow}>{per}%</button>
      </div>
      <br/>
      <div>{isWindow? '창문이 열려 있습니다' : '창문이 닫혀 있습니다'}</div>
      <button onClick={windowOpen} className='button' >창문 열기</button>
      <button onClick={windowClose} className='button'>창문 닫기</button>
      {/*responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>*/}
    </div>
  )
}

export default Window