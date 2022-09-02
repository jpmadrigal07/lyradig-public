import React from "react";

const TableApproveAction = ({ callBack }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      Approve
    </span>
  );
};

export default TableApproveAction;
