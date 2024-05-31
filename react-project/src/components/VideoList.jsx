
import React, { useState } from 'react';
import Videos from './Videos';

const VideoList = (video) => {
  const [name, setName] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideo = () => {
    const context = Object.values(video)[0].video_name;
    setName(context);
    setIsVideoOpen(!isVideoOpen);
  };
  
  return (
    <div>
      <table>
        <tr>
          <td>
            <button className="button" onClick={handleVideo}>
              {isVideoOpen ? '영상 닫기' : '영상 보기'}
            </button>
          </td>
          <td>{Object.values(video)[0].video_name}</td>
        </tr>
      </table>
      {isVideoOpen && <Videos name={name} />}
    </div>
  );
};

export default VideoList;

