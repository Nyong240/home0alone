// import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios';
// import Videos from './Videos';
// // import downloadFile from '../../../config/downloadFile';
// const VideoList = (video) => {
//     const [name,setName] =useState();

//     const handleVideo = () => {
//       const context = Object.values(video)[0].video_name;
//         setName(context);
        
      
//     }
    
//   return (
//     <table>
//     <tr>
//       <td><button onClick={handleVideo}>영상 보기</button></td>
//       <td>{Object.values(video)[0].video_name}</td>
//       <Videos name={name} />

//     </tr>
//   </table>
//   )
// }

// export default VideoList
import React, { useState } from 'react';
// import axios from 'axios';
// import downloadFile from '../../../config/downloadFile';
// const VideoList = (video) => {
//     // handleVideo = () => {
//     //   const context = Object.values(video)[0].video_name;
//     //   downloadFile(context);
//     // }

import Videos from './Videos';

const VideoList = (video) => {
  const [name, setName] = useState('');

  const handleVideo = () => {
    const context = Object.values(video)[0].video_name;
    setName(context);
  };
  
//setIsDownloaded(true);
  return (
    <div>
      <table>
        <tr>
          <td>
            <button onClick={handleVideo}>영상 보기</button>
          </td>
          <td>{Object.values(video)[0].video_name}</td>
        </tr>
      </table>
      <Videos name={name} />
    </div>
  );
};

export default VideoList;
