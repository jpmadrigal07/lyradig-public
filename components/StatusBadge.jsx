import React, { useEffect, useState } from "react";

const StatusBadge = ({ status }) => {
  const [color, setColor] = useState("bg-green-100 text-green-800");
  useEffect(() => {
    switch (status) {
      case "Approved":
        setColor("bg-green-100 text-green-800");
        break;
      case "Submitted":
        setColor("bg-yellow-100 text-yellow-800");
        break;
      case "Requested":
        setColor("bg-yellow-100 text-yellow-800");
        break;
      case "Received":
        setColor("bg-green-100 text-green-800");
        break;
      case "Pending":
        setColor("bg-yellow-100 text-yellow-800");
        break;
      case "Declined":
        setColor("bg-red-100 text-red-800");
        break;
      case "Canceled":
        setColor("bg-gray-100 text-gray-800");
        break;
      case "Blocked":
        setColor("bg-red-100 text-red-800");
        break;
      case "Active":
        setColor("bg-green-100 text-green-800");
        break;
      default:
        break;
    }
  }, [status]);
  return (
    <span
      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${color}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
