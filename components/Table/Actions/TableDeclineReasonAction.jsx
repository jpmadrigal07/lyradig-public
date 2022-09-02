import React from "react";

const TableDeclineReasonAction = ({ callBack }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      View Decline Reason
    </span>
  );
};

export default TableDeclineReasonAction;
