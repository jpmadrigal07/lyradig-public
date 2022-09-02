import React from "react";
import Head from "next/head";
import WithdrawForm from "../../components/Withdraw/WithdrawForm";
import RoleBaseGuard from "../../components/RoleBaseGuard";

const New = () => {
  return (
    <>
      <Head>
        <title>New withdraw - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["User"]}>
        <WithdrawForm />
      </RoleBaseGuard>
    </>
  );
};

export default New;
