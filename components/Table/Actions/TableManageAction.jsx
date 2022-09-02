import React from "react";

const TableManageAction = ({ callBack, isManage = true }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      {isManage ? "Manage" : "Unmanage"}
    </span>
  );
};

export default TableManageAction;
