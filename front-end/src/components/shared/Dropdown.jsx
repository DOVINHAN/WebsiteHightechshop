import React from "react";

const Dropdown = ({ id, label, options }) => {
  return (
    <div className="relative inline-block">
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary px-2 py-1 w-auto"
      >
        <option value="" disabled selected>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
