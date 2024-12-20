import React from "react";

const Button = ({ text, bgColor, textColor, handler = () => {} }) => {
  return (
    <div
      onClick={handler}
      className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-md relative z-10 inline-block`}
    >
      {text}
    </div>
  );
};

export default Button;
