import React, { useEffect, useState } from "react";
import Table from "../Table";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { tableDate } from "../../utils/dateFormatter";
import TableViewAction from "../Table/Actions/TableViewAction";
import TableBlockAction from "../Table/Actions/TableBlockAction";
import ConfirmModal from "../Modal/ConfirmModal";
import StatusBadge from "../StatusBadge";
import moment from "moment";

const StaffList = () => {
  const { verifyLoginData } = useAuth();
  const {
    staffPaginatedData,
    handleStaffRequest,
    isUpdateUserLoading,
    triggerUpdateUser,
    refetchStaffPaginated,
  } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [staffRows, setStaffRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [blockUserId, setBlockUserId] = useState(null);
  const [isBlockUser, setIsBlockUser] = useState(true);
  useEffect(() => {
    if (verifyLoginData) {
      handleStaffRequest(currentPage, verifyLoginData._id);
    }
  }, [verifyLoginData, currentPage, handleStaffRequest]);

  useEffect(() => {
    if (staffPaginatedData) {
      const staffArr = staffPaginatedData.items.map((staff) => {
        let arr = [];
        arr.push(<span>{`${staff.firstName} ${staff.lastName}`}</span>);
        arr.push(<span>{`${staff.email}`}</span>);
        arr.push(<span>{staff.phoneNumber}</span>);
        arr.push(
          <span>
            {staff.blockedAt ? (
              <StatusBadge status="Blocked" />
            ) : (
              <StatusBadge status="Active" />
            )}
          </span>
        );
        arr.push(<span>{tableDate(staff.createdAt)}</span>);
        arr.push(
          <div className="flex gap-2">
            <TableViewAction href={`/staffs/${staff._id}`} />
            {!staff.blockedAt ? (
              <TableBlockAction
                callBack={() => {
                  setBlockUserId(staff._id);
                  setIsBlockUser(true);
                }}
              />
            ) : (
              <TableBlockAction
                callBack={() => {
                  setBlockUserId(staff._id);
                  setIsBlockUser(false);
                }}
                isBlock={false}
              />
            )}
          </div>
        );
        return arr;
      });
      setStaffRows(staffArr);
      setPageCount(staffPaginatedData.pageCount);
    }
  }, [staffPaginatedData]);
  const handleBlockUser = () => {
    const updateData = {
      userId: verifyLoginData._id,
      blockedAt: isBlockUser ? moment() : null,
    };
    triggerUpdateUser([updateData, blockUserId], {
      onSuccess: () => {
        setBlockUserId(null);
        refetchStaffPaginated();
      },
    });
  };
  return (
    <>
      <ConfirmModal
        open={blockUserId ? true : false}
        setOpen={() => setBlockUserId(null)}
        title={isBlockUser ? "Block Staff" : "Unblock Staff"}
        message={`${
          isBlockUser
            ? "Blocking a staff will prohibit them to login to this system"
            : "Unblocking a staff will allowed them to login again to this system"
        }. Are you sure you want to ${
          isBlockUser ? "block" : "unblock"
        } this staff?`}
        agreeButtonText={"Confirm"}
        agreeButtonCallback={() => handleBlockUser()}
        disabled={isUpdateUserLoading}
      />
      <div className="flex items-center max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          Staffs
        </h2>
      </div>
      <div className="mt-3">
        <div className="max-w-6xl mx-auto lg:px-8">
          <div className="flex flex-col mt-2">
            <Table
              columns={[
                "Staff",
                "Email",
                "Phone Number",
                "Status",
                "Date Created",
                "Actions",
              ]}
              rows={staffRows}
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

export default StaffList;
