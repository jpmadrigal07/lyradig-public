import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "../Table";
import useAuth from "../../hooks/useAuth";
import { tableDate } from "../../utils/dateFormatter";
import ConfirmModal from "../Modal/ConfirmModal";
import StatusBadge from "../StatusBadge";
import TableCancelAction from "../Table/Actions/TableCancelAction";
import useWithdraw from "../../hooks/useWithdraw";

const WithdrawList = () => {
  const { verifyLoginData } = useAuth();
  const {
    handleWithdrawRequest,
    withdrawPaginatedData,
    triggerUpdateWithdraw,
    isUpdateWithdrawLoading,
    refetchWithdrawPaginated,
  } = useWithdraw();
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawRows, setWithdrawRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [cancelWithdrawId, setCancelWithdrawId] = useState(null);
  useEffect(() => {
    if (verifyLoginData) {
      handleWithdrawRequest(currentPage, verifyLoginData._id);
    }
  }, [verifyLoginData, currentPage, handleWithdrawRequest]);

  useEffect(() => {
    if (withdrawPaginatedData) {
      const withdrawArr = withdrawPaginatedData.items.map((withdraw) => {
        let arr = [];
        arr.push(
          <span>
            {withdraw.staffId
              ? `${withdraw.staffId.firstName} ${withdraw.staffId.lastName}`
              : "..."}
          </span>
        );
        arr.push(
          <span>{withdraw.amount ? `${withdraw.amount} points` : "..."}</span>
        );
        arr.push(
          <span>
            {withdraw.referenceNumber ? `${withdraw.referenceNumber}` : "..."}
          </span>
        );
        arr.push(<StatusBadge status={withdraw.status} />);
        arr.push(<span>{tableDate(withdraw.createdAt)}</span>);
        arr.push(
          <TableCancelAction
            status={withdraw.status}
            callBack={() => setCancelWithdrawId(withdraw._id)}
          />
        );
        return arr;
      });
      setWithdrawRows(withdrawArr);
      setPageCount(withdrawPaginatedData.pageCount);
    }
  }, [withdrawPaginatedData]);
  const handleCancelWithdraw = () => {
    const updateData = {
      userId: verifyLoginData._id,
      status: "Canceled",
    };
    triggerUpdateWithdraw([updateData, cancelWithdrawId], {
      onSuccess: () => {
        setCancelWithdrawId(null);
        refetchWithdrawPaginated();
      },
    });
  };
  return (
    <>
      <ConfirmModal
        open={cancelWithdrawId ? true : false}
        setOpen={() => setCancelWithdrawId(null)}
        title={"Cancel Withdraw"}
        message={
          "This action is irreversible. Are you sure you want to cancel your withdraw request?"
        }
        agreeButtonText={"Confirm"}
        agreeButtonCallback={() => handleCancelWithdraw()}
        disabled={isUpdateWithdrawLoading}
      />
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          Withdrawals
        </h2>
        <Link href="/withdraw/new">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Request New
          </a>
        </Link>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={[
                "Staff",
                "Amount",
                "Reference Number",
                "Status",
                "Date Created",
                "Actions",
              ]}
              rows={withdrawRows}
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

export default WithdrawList;
