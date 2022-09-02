import React from "react";
import Head from "next/head";
import WithdrawList from "../components/Withdrawals/WithdrawList";
import RoleBaseGuard from "../components/RoleBaseGuard";

const TopUps = () => {
  return (
    <>
      <Head>
        <title>Wthdrawals - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["Admin", "Staff"]}>
        <WithdrawList />
      </RoleBaseGuard>
    </>
  );
};

export default TopUps;
