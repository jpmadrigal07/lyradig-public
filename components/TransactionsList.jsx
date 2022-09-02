import React, { useEffect, useState } from "react";
import Table from "./Table";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import StatusBadge from "./StatusBadge";
import useTransaction from "../hooks/useTransaction";

const TransactionsList = ({ title = "Transactions" }) => {
  const { verifyLoginData } = useAuth();
  const { handleTransactionRequest, transactionPaginatedData } =
    useTransaction();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionRows, setTransactionRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    if (verifyLoginData) {
      handleTransactionRequest(currentPage, verifyLoginData._id);
    }
  }, [verifyLoginData, currentPage, handleTransactionRequest]);

  useEffect(() => {
    if (transactionPaginatedData) {
      const withdrawArr = transactionPaginatedData.items.map((withdraw) => {
        let arr = [];
        arr.push(<span>{withdraw.type ? `${withdraw.type}` : "..."}</span>);
        arr.push(
          <span>{withdraw.amount ? `${withdraw.amount} points` : "..."}</span>
        );
        arr.push(<StatusBadge status={withdraw.status} />);
        arr.push(<span>{moment(withdraw.createdAt).fromNow()}</span>);
        return arr;
      });
      setTransactionRows(withdrawArr);
      setPageCount(transactionPaginatedData.pageCount);
    }
  }, [transactionPaginatedData]);
  return (
    <>
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={["Type", "Amount", "Status", "Date Created"]}
              rows={transactionRows}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsList;
