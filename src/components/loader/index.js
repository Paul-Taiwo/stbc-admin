import React from "react";

import "../../assets/loader.css";

const Loader = () => {
  return (
    <div>
      <div className='lds-inner'>
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
