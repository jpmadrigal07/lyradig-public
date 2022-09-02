import Head from "next/head";
import BasicInfoForm from "../components/Settings/BasicInfoForm";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";

function Settings() {
  return (
    <>
      <Head>
        <title>Settings - Lyradig</title>
      </Head>
      <BasicInfoForm />
      <ChangePasswordForm />
    </>
  );
}

export default Settings;
