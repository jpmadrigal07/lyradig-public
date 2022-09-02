import React from "react";
import Link from "next/link";

const TableViewAction = ({ href }) => {
  return (
    <Link href={href}>
      <a
        className={`font-bold text-cyan-600 hover:underline hover:cursor-pointer`}
        href="#"
      >
        View
      </a>
    </Link>
  );
};

export default TableViewAction;
