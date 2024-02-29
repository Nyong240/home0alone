// import { setHours, setMinutes } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react'
// import { InputGroup } from 'react-bootstrap';
// import ReactDatePicker from 'react-datepicker';
// import TimePicker from 'react-time-picker';
import axios from 'axios'

const GoingOutMode = () => {

    let today = new Date()
    const hRef = useRef()
    const mRef = useRef()
    const [hours, setHours] = useState()
    const [mins, setMins] = useState()
    const [time, setTime] = useState();
    const [responseData, setResponseData] = useState(null);
    
    const isOn = 'true'
    const isOff = 'false'
    const [isOnOff, setIsOnOff] = useState(undefined)
    const hourList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const minSecList = [0,5,10,15,20,25,30,35,40,45,50,55]

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
        
        let time = [Number(hRef.current.value), Number(mRef.current.value)]

        setTime({h:Number(hRef.current.value),m:Number(mRef.current.value)})
        
        try{            
            const response = await axios.post('http://172.30.1.48:8080/api/goingout', {time});
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
            
            const response = await axios.post('http://172.30.1.48:8080/api/onoff',{isOff});
            console.log("성공")
            setResponseData(response.data);
            console.log(response.data); // 응답 확인
        }catch(error){
            console.error('window켜는중에 에러 발생', error);
        }
    };

    const turnOn = async() =>{
        
        try{
            const response = await axios.post('http://172.30.1.48:8080/api/onoff',{isOn});
            console.log("성공")
            setResponseData(response.data);
            console.log(response.data); // 응답 확인
        }catch(error){
            console.error('window켜는중에 에러 발생', error);
        }
    };
    

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
        </div>
        <br/>
        <button className='button' onClick={turnOn}>외출모드 켜기</button>
        <button className='button' onClick={turnOff}>외출모드 끄기</button>
        {responseData && <div>받은 응답: {JSON.stringify(responseData.message)}</div>}

        
    </div>
  )
}

export default GoingOutMode