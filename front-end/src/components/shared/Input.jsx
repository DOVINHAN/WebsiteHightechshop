import React from "react";

const Input = ({ placeholder, type = "text" }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-2 text-gray-700 bg-transparent border-b-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-0 transition-all"
      />
    </div>
  );
};

export default Input;
