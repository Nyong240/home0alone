import React, { useEffect, useState } from "react";
import axios from '../axios';

const MemberList = () => {
  const [memberlist, setMemberlist] = useState([]);

  let id = sessionStorage.getItem('user');

  useEffect(()=>{
    axios.post('/admin/memberlist',{id})
    .then((res)=>{
      // console.log(res.data);
      // console.log(res.data.results);
      // console.log(res.data.results[0]);
      // console.log(res.data.results[0].user_id);

      
      const member = res.data.results;
      setMemberlist(member);
         
    })
  },[])

  return (
    <div>
      <h1>회원정보</h1>
        <table>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>주소</th>
            <th>전화번호</th>
          </tr>
          {memberlist.map((item)=>(
            <tr key={item.user_id}>
              <td>{item.user_id}</td>
              <td>{item.user_name}</td>
              <td>{item.user_addr}</td>
              <td>{item.user_tel}</td>
            </tr>
          ))}
        </table>     
    </div>
  );
};

export default MemberList;
