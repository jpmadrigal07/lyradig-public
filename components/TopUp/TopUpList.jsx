import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "../Table";
import useTopUp from "../../hooks/useTopUp";
import useAuth from "../../hooks/useAuth";
import toCurrency from "../../utils/toCurrency";
import { tableDate } from "../../utils/dateFormatter";
import ConfirmModal from "../Modal/ConfirmModal";
import DeclineReasonModal from "../Modal/DeclineReasonModal";
import StatusBadge from "../StatusBadge";
import TableCancelAction from "../Table/Actions/TableCancelAction";
import TableDeclineReasonAction from "../Table/Actions/TableDeclineReasonAction";

const TopUpList = () => {
  const { verifyLoginData } = useAuth();
  const {
    handleTopUpRequest,
    topUpPaginatedData,
    triggerUpdateTopUp,
    isUpdateTopUpLoading,
    refetchTopUpPaginated,
  } = useTopUp();
  const [currentPage, setCurrentPage] = useState(1);
  const [topUpRows, setTopUpRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [cancelTopUpId, setCancelTopUpId] = useState(null);
  const [declineReason, setDeclineReason] = useState(null);
  useEffect(() => {
    if (verifyLoginData) {
      handleTopUpRequest(currentPage, verifyLoginData._id);
    }
  }, [verifyLoginData, currentPage, handleTopUpRequest]);

  useEffect(() => {
    if (topUpPaginatedData) {
      const topUpArr = topUpPaginatedData.items.map((topUp) => {
        let arr = [];
        arr.push(
          <span>
            {topUp.staffId
              ? `${topUp.staffId.firstName} ${topUp.staffId.lastName}`
              : "..."}
          </span>
        );
        arr.push(
          <span>
            {topUp.pricePoints
              ? `${topUp.pricePoints.points} daily - ${toCurrency(
                  topUp.pricePoints.price
                )}`
              : "..."}
          </span>
        );
        arr.push(<span>{topUp.referenceNumber}</span>);
        arr.push(<StatusBadge status={topUp.status} />);
        arr.push(<span>{tableDate(topUp.createdAt)}</span>);
        arr.push(
          <>
            {topUp.status === "Pending" && (
              <TableCancelAction
                status={topUp.status}
                callBack={() => setCancelTopUpId(topUp._id)}
              />
            )}
            {topUp.status === "Declined" && (
              <TableDeclineReasonAction
                callBack={() => setDeclineReason(topUp.declineReason)}
              />
            )}
            {topUp.status === "Approved" && (
              <p className="text-sm text-gray-400 italic">No actions</p>
            )}
          </>
        );
        return arr;
      });
      setTopUpRows(topUpArr);
      setPageCount(topUpPaginatedData.pageCount);
    }
  }, [topUpPaginatedData]);
  const handleCancelTopUp = () => {
    const updateData = {
      userId: verifyLoginData._id,
      status: "Canceled",
    };
    triggerUpdateTopUp([updateData, cancelTopUpId], {
      onSuccess: () => {
        setCancelTopUpId(null);
        refetchTopUpPaginated();
      },
    });
  };
  return (
    <>
      <ConfirmModal
        open={cancelTopUpId ? true : false}
        setOpen={() => setCancelTopUpId(null)}
        title={"Cancel Top Up"}
        message={
          "This action is irreversible. Are you sure you want to cancel your top up?"
        }
        agreeButtonText={"Confirm"}
        agreeButtonCallback={() => handleCancelTopUp()}
        disabled={isUpdateTopUpLoading}
      />
      <DeclineReasonModal
        open={declineReason ? true : false}
        setOpen={() => setDeclineReason(null)}
        reason={declineReason}
      />
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          Top ups
        </h2>
        <Link href="/top-up/new">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Submit New
          </a>
        </Link>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={[
                "Staff",
                "Points",
                "Reference Number",
                "Status",
                "Date Created",
                "Actions",
              ]}
              rows={topUpRows}
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

export default TopUpList;
