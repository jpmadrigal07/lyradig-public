import React, { useEffect, useState, useCallback } from "react";
import Table from "../Table";
import useTopUp from "../../hooks/useTopUp";
import useAuth from "../../hooks/useAuth";
import toCurrency from "../../utils/toCurrency";
import { tableDate } from "../../utils/dateFormatter";
import StatusBadge from "../StatusBadge";
import TableManageAction from "../Table/Actions/TableManageAction";
import TableApproveAction from "../Table/Actions/TableApproveAction";
import ConfirmModal from "../Modal/ConfirmModal";
import TableDeclineAction from "../Table/Actions/TableDeclineAction";
import DeclineModal from "../Modal/DeclineModal";

const TopUpList = () => {
  const { verifyLoginData } = useAuth();
  const {
    handleTopUpRequest,
    topUpPaginatedData,
    triggerUpdateTopUp,
    refetchTopUpPaginated,
    isUpdateTopUpLoading,
  } = useTopUp();
  const [currentPage, setCurrentPage] = useState(1);
  const [topUpRows, setTopUpRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [approveTopUpId, setApproveTopUpId] = useState(null);
  const [declineTopUpId, setDeclineTopUpId] = useState(null);
  const [declineTopUpReason, setDeclineTopUpReason] = useState(null);
  const [declineModalError, setDeclineModalError] = useState(null);
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
            {!topUp.staffId && (
              <TableManageAction
                callBack={() => handleManageTopUp(topUp._id)}
              />
            )}
            {topUp.staffId &&
              topUp.staffId._id === verifyLoginData._id &&
              topUp.status === "Pending" && (
                <div className="flex gap-2">
                  <TableApproveAction
                    callBack={() => setApproveTopUpId(topUp._id)}
                  />
                  <TableDeclineAction
                    callBack={() => setDeclineTopUpId(topUp._id)}
                  />
                  <TableManageAction
                    isManage={false}
                    callBack={() => handleManageTopUp(topUp._id, false)}
                  />
                </div>
              )}
            {topUp.staffId &&
            (topUp.staffId._id !== verifyLoginData._id ||
              topUp.status === "Approved" ||
              topUp.status === "Declined") ? (
              <p className="text-sm text-gray-400 italic">No actions</p>
            ) : null}
          </>
        );
        return arr;
      });
      setTopUpRows(topUpArr);
      setPageCount(topUpPaginatedData.pageCount);
    }
  }, [
    verifyLoginData._id,
    topUpPaginatedData,
    handleManageTopUp,
    handleApproveTopUp,
  ]);
  const handleManageTopUp = useCallback(
    (topUpId, manage = true) => {
      const updateData = {
        userId: verifyLoginData._id,
        staffId: manage ? verifyLoginData._id : null,
      };
      triggerUpdateTopUp([updateData, topUpId], {
        onSuccess: () => {
          refetchTopUpPaginated();
        },
      });
    },
    [verifyLoginData._id, triggerUpdateTopUp, refetchTopUpPaginated]
  );
  const handleApproveTopUp = useCallback(() => {
    const updateData = {
      userId: verifyLoginData._id,
      status: "Approved",
    };
    triggerUpdateTopUp([updateData, approveTopUpId], {
      onSuccess: () => {
        setApproveTopUpId(null);
        refetchTopUpPaginated();
      },
    });
  }, [
    verifyLoginData._id,
    triggerUpdateTopUp,
    refetchTopUpPaginated,
    approveTopUpId,
  ]);
  const handleDeclineTopUp = useCallback(() => {
    if (declineTopUpReason) {
      setDeclineModalError(null);
      const updateData = {
        userId: verifyLoginData._id,
        status: "Declined",
        declineReason: declineTopUpReason,
      };
      triggerUpdateTopUp([updateData, declineTopUpId], {
        onSuccess: () => {
          setDeclineTopUpId(null);
          refetchTopUpPaginated();
        },
      });
    } else {
      setDeclineModalError("This field is required");
    }
  }, [
    verifyLoginData._id,
    triggerUpdateTopUp,
    refetchTopUpPaginated,
    declineTopUpId,
    declineTopUpReason,
  ]);
  return (
    <>
      <ConfirmModal
        open={approveTopUpId ? true : false}
        setOpen={() => setApproveTopUpId(null)}
        title={"Approve Top Up"}
        message={
          "This action is irreversible. Are you sure you want to approve this top up? Have you check the reference number if your company already received the funds?"
        }
        agreeButtonText={"Confirm"}
        agreeButtonCallback={() => handleApproveTopUp()}
        disabled={isUpdateTopUpLoading}
      />
      <DeclineModal
        open={declineTopUpId ? true : false}
        setOpen={() => setDeclineTopUpId(null)}
        title={"Decline Top Up"}
        setDeclineReason={setDeclineTopUpReason}
        agreeButtonText={"Save"}
        agreeButtonCallback={() => handleDeclineTopUp()}
        disabled={isUpdateTopUpLoading}
        errorMessage={declineModalError}
      />
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          Top ups
        </h2>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={[
                "Manage by",
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
