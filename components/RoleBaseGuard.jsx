import React from "react";
import useAuth from "../hooks/useAuth";
import MessagePlaceHolder from "../components/MessagePlaceHolder";

const RoleBaseGuard = ({ children, role = ["User"] }) => {
  const { verifyLoginData, isVerifyLoginLoading } = useAuth();
  const renderContent = () => {
    const isUserTypeAllowed = verifyLoginData
      ? role.includes(verifyLoginData.userType)
      : false;
    if (isVerifyLoginLoading && !verifyLoginData) {
      return <MessagePlaceHolder />;
    } else if (!isVerifyLoginLoading && verifyLoginData && isUserTypeAllowed) {
      return children;
    } else if (!isVerifyLoginLoading && verifyLoginData && !isUserTypeAllowed) {
      return <MessagePlaceHolder text="Page not found" />;
    }
  };
  return renderContent();
};

export default RoleBaseGuard;
