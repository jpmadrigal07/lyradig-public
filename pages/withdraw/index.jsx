import React from "react";
import Head from "next/head";
import WithdrawList from "../../components/Withdraw/WithdrawList";
import RoleBaseGuard from "../../components/RoleBaseGuard";

const Withdraw = () => {
  return (
    <>
      <Head>
        <title>Withdraw - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["User"]}>
        <WithdrawList />
      </RoleBaseGuard>
    </>
  );
};

export default Withdraw;
