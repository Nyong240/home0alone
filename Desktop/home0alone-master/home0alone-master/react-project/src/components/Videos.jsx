import React from 'react';

const Videos = ({ name }) => {
  return (
  
    <div>
      {name?(<iframe
      src={`/videos/${name}.mp4`}
      title="Video Player"
      width="320"
      height="240"
      allow="autoplay"
    ></iframe>):(<div></div>)}
    </div>
  );
};

export default Videos;
