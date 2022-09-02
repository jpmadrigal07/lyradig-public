import React from "react";
import Head from "next/head";
import TopUpList from "../components/TopUps/TopUpList";
import RoleBaseGuard from "../components/RoleBaseGuard";

const TopUps = () => {
  return (
    <>
      <Head>
        <title>Top ups - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["Admin", "Staff"]}>
        <TopUpList />
      </RoleBaseGuard>
    </>
  );
};

export default TopUps;
