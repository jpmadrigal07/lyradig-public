import Head from "next/head";
import Overview from "../components/Overview";
import RecentActivity from "../components/RecentActivity";
import getServerSideProps from "../lib/getServerSideProps";
import RoleBaseGuard from "../components/RoleBaseGuard";

function Home() {
  return (
    <>
      <Head>
        <title>Home - Lyradig</title>
      </Head>
      <RoleBaseGuard role={["User"]}>
        <>
          <Overview />
          <RecentActivity />
        </>
      </RoleBaseGuard>
    </>
  );
}

Home.isUserInfoVisible = true;

export default Home;

export { getServerSideProps };
