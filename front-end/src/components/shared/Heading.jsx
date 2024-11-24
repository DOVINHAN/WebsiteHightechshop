import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="mb-10 max-w-[600px] space-y-2">
      <div className="bg-primary h-8 w-5 mb-8 rounded-md"></div>
      <h1 className="text-xl font-bold lg:text-2xl">{title}</h1>
    </div>
  );
};

export default Heading;
