import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
};

export default Button;
