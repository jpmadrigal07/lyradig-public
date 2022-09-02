import React from "react";
import { useRouter } from "next/router";
import RoleBaseGuard from "../../components/RoleBaseGuard";
import Head from "next/head";
import BasicInfoForm from "../../components/Staffs/BasicInfoForm";

const UpdateStaff = () => {
  const router = useRouter();
  const { staffId } = router.query;
  return (
    <>
      <Head>
        <title>Settings - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["Admin"]}>
        <BasicInfoForm staffId={staffId} />
      </RoleBaseGuard>
    </>
  );
};

export default UpdateStaff;
