import React from "react";

const TableBlockAction = ({ callBack, isBlock = true }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      {isBlock ? "Block" : "Unblock"}
    </span>
  );
};

export default TableBlockAction;
