import React from "react";

const TableCancelAction = ({ status, callBack }) => {
  return (
    <span
      className={`font-bold ${
        status === "Pending"
          ? "text-cyan-600 hover:underline hover:cursor-pointer"
          : "text-gray-300 hover:no-underline hover:cursor-not-allowed"
      }`}
      onClick={() => status === "Pending" && callBack()}
    >
      Cancel
    </span>
  );
};

export default TableCancelAction;
