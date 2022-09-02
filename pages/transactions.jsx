import React from "react";
import Head from "next/head";
import TransactionsList from "../components/TransactionsList";
import RoleBaseGuard from "../components/RoleBaseGuard";

const Transactions = () => {
  return (
    <>
      <Head>
        <title>Transactions - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["User"]}>
        <TransactionsList />
      </RoleBaseGuard>
    </>
  );
};

export default Transactions;
