import React from "react";
import RoleBaseGuard from "../../components/RoleBaseGuard";
import StaffList from "../../components/Staffs/StaffList";

const Staffs = () => {
  return (
    <RoleBaseGuard role={["Admin"]}>
      <StaffList />
    </RoleBaseGuard>
  );
};

export default Staffs;
