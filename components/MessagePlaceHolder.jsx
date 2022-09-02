import React from "react";

const NotAllowedHere = ({ text = "..." }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3>{text}</h3>
    </div>
  );
};

export default NotAllowedHere;
