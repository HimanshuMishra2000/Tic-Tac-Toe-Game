import React from "react";
import {Turn} from './styles/Turn'

const Square = ({ className, row, col, handle, turn, no, highLight }) => {

  const handleClick=()=>{

    if(handle !== undefined){
      handle(row, col)
    }
  }
  return (

    <>
      {/* <Turn/> */}
      {/* <div className={className} onClick={() => handle(row, col)}>
        {no}
      </div> */}
      <Turn className={className} onClick={handleClick} no={no} turn={turn} highLight={highLight} row={row} col={col}>
        {no}
      </Turn>
    </>
  );
};

export { Square };
