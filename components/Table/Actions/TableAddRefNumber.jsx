import React from "react";

const TableAddRefNumber = ({ callBack }) => {
  return (
    <span
      className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
      onClick={() => callBack()}
    >
      Add Ref #
    </span>
  );
};

export default TableAddRefNumber;
