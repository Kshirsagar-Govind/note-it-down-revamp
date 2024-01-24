import React, { Component } from "react";

const FloatingButton = ({ text, callback, style }) => {
  return (
    <div 
    onClick={callback}
    className="cursor-pointer transition-all hover:-translate-y-1 fixed w-[50px] h-[50px] shadow-md rounded-md bg-theme-color bottom-10 right-10 flex justify-center align-middle items-center">
      <button  className="add-something-button">
        <span className="text-pure text-[28px]" >{text}</span>
      </button>
    </div>
  );
};
export default FloatingButton;
