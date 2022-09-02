import React, { useEffect, useState } from "react";
import { CheckCircleIcon, DeviceMobileIcon } from "@heroicons/react/solid";
import Image from "next/image";
import UserImage from "../../assets/images/user.png";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const UserInfo = () => {
  const { verifyLoginData, isVerifyLoginLoading } = useAuth();
  const [firstName, setFirstName] = useState("...");
  const [phoneNumber, setPhoneNumber] = useState("...");
  const [referralCode, setReferralCode] = useState("");
  useEffect(() => {
    if (verifyLoginData) {
      setFirstName(verifyLoginData.firstName);
      setPhoneNumber(verifyLoginData.phoneNumber);
      const strId = String(verifyLoginData._id);
      const userIdLastFiveChar = strId.slice(strId.length - 5);
      setReferralCode(`${verifyLoginData.referralCode}${userIdLastFiveChar}`);
    }
  }, [verifyLoginData]);
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <div className="hidden sm:block">
                <Image
                  src={UserImage}
                  alt="User image"
                  width="64px"
                  height="64px"
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="sm:hidden">
                    <Image
                      src={UserImage}
                      alt="User image"
                      width="64px"
                      height="64px"
                      className="rounded-full"
                    />
                  </div>
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    Hello, {firstName}
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                    <DeviceMobileIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {phoneNumber}
                  </dd>
                  <dt className="sr-only">Account status</dt>
                  <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                    <CheckCircleIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                    Verified account
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <Link href="/top-up">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Top up
              </a>
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.APP_URL}/create?referralCode=${referralCode}`
                );
                toast.success("Copied referral code to clipboard");
              }}
              type="button"
              disabled={isVerifyLoginLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy Referral Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
