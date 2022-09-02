import React from "react";

const TableDeclineActions = ({ callBack }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      Decline
    </span>
  );
};

export default TableDeclineActions;
