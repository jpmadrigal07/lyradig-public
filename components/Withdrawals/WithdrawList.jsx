import React, { useEffect, useState, useCallback } from "react";
import Table from "../Table";
import useWithdraw from "../../hooks/useWithdraw";
import useAuth from "../../hooks/useAuth";
import { tableDate } from "../../utils/dateFormatter";
import StatusBadge from "../StatusBadge";
import TableManageAction from "../Table/Actions/TableManageAction";
import TableDeclineAction from "../Table/Actions/TableDeclineAction";
import DeclineModal from "../Modal/DeclineModal";
import TableAddRefNumber from "../Table/Actions/TableAddRefNumber";
import AddRefNumberModal from "../Modal/AddRefNumberModal";

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
  const [approveWithdrawId, setApproveWithdrawId] = useState(null);
  const [declineWithdrawId, setDeclineWithdrawId] = useState(null);
  const [declineWithdrawReason, setDeclineWithdrawReason] = useState(null);
  const [declineModalError, setDeclineModalError] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState(null);
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
          <span>
            {withdraw.userId
              ? `${withdraw.userId.firstName} ${withdraw.userId.lastName}`
              : "..."}
          </span>
        );
        arr.push(
          <span>
            {withdraw.userId ? `${withdraw.userId.phoneNumber}` : "..."}
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
          <>
            {!withdraw.staffId && (
              <TableManageAction
                callBack={() => handleManageTopUp(withdraw._id)}
              />
            )}
            {withdraw.staffId &&
              withdraw.staffId._id === verifyLoginData._id &&
              withdraw.status === "Pending" && (
                <div className="flex gap-2">
                  <TableAddRefNumber
                    callBack={() => setApproveWithdrawId(withdraw._id)}
                  />
                  <TableDeclineAction
                    callBack={() => setDeclineWithdrawId(withdraw._id)}
                  />
                  <TableManageAction
                    isManage={false}
                    callBack={() => handleManageTopUp(withdraw._id, false)}
                  />
                </div>
              )}
            {withdraw.staffId &&
            (withdraw.status === "Approved" ||
              withdraw.status === "Declined") ? (
              <p className="text-sm text-gray-400 italic">No actions</p>
            ) : null}
          </>
        );
        return arr;
      });
      setWithdrawRows(withdrawArr);
      setPageCount(withdrawPaginatedData.pageCount);
    }
  }, [
    verifyLoginData._id,
    withdrawPaginatedData,
    handleManageTopUp,
    handleApproveTopUp,
  ]);
  const handleManageTopUp = useCallback(
    (withdrawId, manage = true) => {
      const updateData = {
        userId: verifyLoginData._id,
        staffId: manage ? verifyLoginData._id : null,
      };
      triggerUpdateWithdraw([updateData, withdrawId], {
        onSuccess: () => {
          refetchWithdrawPaginated();
        },
      });
    },
    [verifyLoginData._id, triggerUpdateWithdraw, refetchWithdrawPaginated]
  );
  const handleApproveTopUp = useCallback(() => {
    const updateData = {
      userId: verifyLoginData._id,
      status: "Approved",
      referenceNumber,
    };
    triggerUpdateWithdraw([updateData, approveWithdrawId], {
      onSuccess: () => {
        setApproveWithdrawId(null);
        refetchWithdrawPaginated();
      },
    });
  }, [
    verifyLoginData._id,
    triggerUpdateWithdraw,
    refetchWithdrawPaginated,
    approveWithdrawId,
    referenceNumber,
  ]);
  const handleDeclineTopUp = useCallback(() => {
    if (declineWithdrawReason) {
      setDeclineModalError(null);
      const updateData = {
        userId: verifyLoginData._id,
        status: "Declined",
        declineReason: declineWithdrawReason,
      };
      triggerUpdateWithdraw([updateData, declineWithdrawId], {
        onSuccess: () => {
          setDeclineWithdrawId(null);
          refetchWithdrawPaginated();
        },
      });
    } else {
      setDeclineModalError("This field is required");
    }
  }, [
    verifyLoginData._id,
    triggerUpdateWithdraw,
    refetchWithdrawPaginated,
    declineWithdrawId,
    declineWithdrawReason,
  ]);
  return (
    <>
      <AddRefNumberModal
        open={approveWithdrawId ? true : false}
        setOpen={() => setApproveWithdrawId(null)}
        agreeButtonText={"Approve"}
        agreeButtonCallback={() => handleApproveTopUp()}
        setReferenceNumber={setReferenceNumber}
        disabled={isUpdateWithdrawLoading}
      />
      <DeclineModal
        open={declineWithdrawId ? true : false}
        setOpen={() => setDeclineWithdrawId(null)}
        title={"Decline Withdrawal"}
        setDeclineReason={setDeclineWithdrawReason}
        agreeButtonText={"Save"}
        agreeButtonCallback={() => handleDeclineTopUp()}
        disabled={isUpdateWithdrawLoading}
        errorMessage={declineModalError}
      />
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          Withdrawals
        </h2>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={[
                "Mange by",
                "Client",
                "Phone Number",
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
