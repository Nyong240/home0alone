
import React, { useEffect, useRef, useState, useContext } from 'react'
import { SocketContext } from '../context/socket';
import axios from 'axios'

const GoingOutMode = () => {

    let today = new Date()
    const hRef = useRef()
    const mRef = useRef()
    const [hours, setHours] = useState()
    const [h,setH] = useState();
    const [m,setM] = useState();
    const [mins, setMins] = useState()
    const [time, setTime] = useState();
    const [responseData, setResponseData] = useState(null);
    const [current,setCurrent] = useState();
    const isOn = 'true'
    const isOff = 'false'
    const [isOnOff, setIsOnOff] = useState(undefined)
    const hourList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const minSecList = [0,5,10,15,20,25,30,35,40,45,50,55]

    // 소켓 연결
    const socket = useContext(SocketContext);

    let id = sessionStorage.getItem('user');

    useEffect(() => {
      axios.post('/values/Data', { id })
        .then((res) => {
          const goingOut = res.data.results[0];
          
          setH(goingOut.going_out_h);
          setM(goingOut.going_out_m);
          setCurrent(goingOut.going_out_current)
        })
        .catch(error => console.error(error));
    }, [id,h,m]);
  
    useEffect(() => {
        // 소켓 클라이언트를 설정합니다.
        const socketClient = socket.socket; 
        
        // 소켓 이벤트를 리스닝하여 데이터를 받습니다.
        socketClient.on('sensorData', (data) => {
            console.log('Received sensor data from server:', data);
            window.alert(data)
            // 받은 데이터를 처리하거나 상태에 저장할 수 있습니다.
            
        });
        
        return () => {
            // 컴포넌트가 언마운트될 때 소켓 연결을 해제합니다.
            socket.disconnect();
        };
    }, []);

    const sethours = ()=>{
        setHours(hRef.current.value)
    };

    const setmins = ()=>{
        setMins(mRef.current.value)
    };

    const setGoingOut = async()=>{
        console.log(hRef.current.value, mRef.current.value);
        const a = [hRef.current.value, mRef.current.value]
        setTime(a)
        axios.post('/values/time',{id,a});
        setH(hRef.current.value)
        setM(mRef.current.value)
        let time = [Number(hRef.current.value), Number(mRef.current.value)]

        setTime({h:Number(hRef.current.value),m:Number(mRef.current.value)})
        
        try{            
            const response = await axios.post('http://172.30.1.46:8080/api/goingout', {time});
            console.log("성공")
            setResponseData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('window control 중에 에러 발생', error);        
        }
    };

    useEffect(()=>{
        if(time !== undefined){
            try{            
                const response = axios.post('http://172.30.1.48:8080/api/goingout', {time});
                console.log("성공")
                setResponseData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('window control 중에 에러 발생', error);        
            }
        }

    },[time]);

    const a = {
        paddingRight : '20px'
    };

/* =========================== isOFf ============================*/
 
 
const turnOff = async() =>{
    try{
        axios.post('values/outOff',{id,current})
        setCurrent(false)
        const response = await axios.post('http://172.30.1.46:8080/api/onoff',{isOff});
        console.log("성공")
        setResponseData(response.data);
        console.log(response.data); // 응답 확인
    
        window.alert('외출모드가 꺼졌습니다')
    }catch(error){
        console.error('window켜는중에 에러 발생', error);
    }
}

const turnOn = async() =>{
    
    try{
        axios.post('values/outOn',{id,current})
        setCurrent(true)
        const response = await axios.post('http://172.30.1.46:8080/api/onoff',{isOn});
        console.log("성공")
        setResponseData(response.data);
        console.log(response.data); // 응답 확인

        window.alert('외출모드가 켜졌습니다')
        console.log('외출모드 on');

    }catch(error){
        console.error('window켜는중에 에러 발생', error);
    }
} 
    

  return (
    <div className='goingout'>
        <h1>외출모드</h1>
        
        <div>
            <select ref={hRef}>
                {hourList.map((item)=>{return <option value={hours} key={hours} onChange={sethours}>{item}</option>})}
            </select>
            <span style={a}>시</span>
            <select ref={mRef}>
                {minSecList.map((item)=>{return <option value={mins} key={mins} onChange={setmins}>{item}</option>})}
            </select>
            <span style={a}>분</span>
            <button className='button' onClick={setGoingOut}>설정</button>
            <div>설정 시간 : {h}시 {m}분 입니다</div>
        </div>
        <br/>
        <div>{current? '외출모드가 켜져있습니다.':'외출모드가 꺼져있습니다.'}</div>
        <button className='button' onClick={turnOn}>외출모드 켜기</button>
        <button className='button' onClick={turnOff}>외출모드 끄기</button>
        {/*responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>*/}

        
    </div>
  )
}

export default GoingOutMode