import Link from "next/link";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Head from "next/head";
import useAuth from "../hooks/useAuth";
import MainLogo from "../assets/svg/MainLogo";
import { useRouter } from "next/router";

function Create() {
  const router = useRouter();
  const { referralCode } = router.query;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { triggerAddUser, isAddUserLoading } = useAuth();
  const _submitHandler = (e) => {
    e.preventDefault();
    const inputPhone = e.target.phoneNumber.value;
    const cleanInputPhone = inputPhone.replace(/^\D+/g, "");
    const completeInputPhone = `+63${inputPhone}`;
    const regexPhPhoneNumber = /^(\+63|\+639)\d{10}$/gm;
    const validPhoneNumber = regexPhPhoneNumber.test(completeInputPhone);
    if (inputPhone && cleanInputPhone.length === 10 && validPhoneNumber) {
      const phoneNumber = completeInputPhone;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      triggerAddUser({
        phoneNumber,
        email,
        password,
        firstName,
        lastName,
        referralCode,
      });
    } else {
      toast.error("Invalid phone number", {
        id: "addUser",
      });
    }
  };
  return (
    <div>
      <Head>
        <title>Create account - Lyradig</title>
      </Head>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center">
            <MainLogo />
          </div>

          <p className="mt-4">Create an account and start earning</p>
        </div>

        <form
          onSubmit={_submitHandler}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="phoneNumber"
            >
              {" "}
              Phone number (e.g. 9501234567){" "}
            </label>
            <div className="mt-1 flex rounded-md">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +63
              </span>
              <input
                className="w-full p-2 text-sm border-1 border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
                id="phoneNumberEmail"
                maxLength={10}
                type="text"
                name="phoneNumber"
                disabled={isAddUserLoading}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="firstName"
            >
              {" "}
              First Name{" "}
            </label>
            <input
              className="w-full p-2 mt-1 text-sm border-1 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
              id="firstName"
              type="text"
              name="firstName"
              disabled={isAddUserLoading}
              required
            />
          </div>

          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="lastName"
            >
              {" "}
              Last Name{" "}
            </label>
            <input
              className="w-full p-2 mt-1 text-sm border-1 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
              id="lastName"
              type="text"
              name="lastName"
              disabled={isAddUserLoading}
              required
            />
          </div>

          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="email"
            >
              {" "}
              Email{" "}
            </label>
            <input
              className="w-full p-2 mt-1 text-sm border-1 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
              id="email"
              type="email"
              name="email"
              disabled={isAddUserLoading}
              required
            />
          </div>

          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="password"
            >
              {" "}
              Password{" "}
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                disabled={isAddUserLoading}
                className="w-full p-2 mt-1 text-sm border-1 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {isPasswordVisible ? (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-500"
                    onClick={() => setIsPasswordVisible(false)}
                    aria-hidden="true"
                  />
                ) : (
                  <EyeOffIcon
                    className="h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-500"
                    onClick={() => setIsPasswordVisible(true)}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/">
                <span className="underline hover:cursor-pointer text-cyan-800 font-bold">
                  Sign in
                </span>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block px-4 py-2 ml-3 text-sm font-medium text-white bg-cyan-800 text-primary rounded-md hover:bg-cyan-900"
              disabled={isAddUserLoading}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Create.hideMainLayout = true;

export default Create;
