import { Spin } from 'antd';
import React from 'react';
import style from  './Loading.module.scss';  // Import the CSS file

const Loading = () => {
  return (
    <div className={style.loading_container}>
      <Spin size="large" /> 
    </div>
  );
};

export default Loading;
