import { useState } from "react";
import Drawer from "./Drawer";
import DrawerMobile from "./Drawer/Mobile";
import Header from "../components/Header";
import UserInfo from "../components/Header/UserInfo";
import useAuth from "../hooks/useAuth";

const MainLayout = ({ children, isUserInfoVisible }) => {
  const { verifyLoginData, isVerifyLoginLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const renderUserInfo = () => {
    if (
      !isVerifyLoginLoading &&
      verifyLoginData &&
      verifyLoginData.userType === "User" &&
      isUserInfoVisible
    ) {
      return <UserInfo />;
    }
  };
  return (
    <>
      <div className="min-h-full">
        <DrawerMobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Drawer />
        <div className="lg:pl-64 flex flex-col flex-1">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 pb-8">
            {renderUserInfo()}
            <div className="mt-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
