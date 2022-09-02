import React from "react";
import Head from "next/head";
import TopUpList from "../../components/TopUp/TopUpList";
import RoleBaseGuard from "../../components/RoleBaseGuard";

const TopUp = () => {
  return (
    <>
      <Head>
        <title>Top up - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["User"]}>
        <TopUpList />
      </RoleBaseGuard>
    </>
  );
};

export default TopUp;
