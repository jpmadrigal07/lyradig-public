import Link from "next/link";
import { useRef, useEffect } from "react";
import Head from "next/head";
import useAuth from "../hooks/useAuth";
import MainLogo from "../assets/svg/MainLogo";

function Index() {
  const inputElement = useRef(null);
  const { triggerAuthenticateUser, isAuthenticateUserLoading } = useAuth();
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  const _submitHandler = (e) => {
    e.preventDefault();
    const phoneNumberEmail = `+63${e.target.phoneNumberEmail.value}`;
    const password = e.target.password.value;
    triggerAuthenticateUser({ username: phoneNumberEmail, password });
  };
  return (
    <div>
      <Head>
        <title>Login - Lyradig</title>
      </Head>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center">
            <MainLogo />
          </div>
          <p className="mt-4 text-center">
            The platform that you can trust to get the best out of your future
          </p>
        </div>

        <form
          onSubmit={_submitHandler}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="phoneNumberEmail"
            >
              {" "}
              Phone number (e.g. 9501234567){" "}
            </label>
            <div className="mt-1 flex rounded-md">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +63
              </span>
              <input
                ref={inputElement}
                className="w-full p-2 text-sm border-1 border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
                id="phoneNumberEmail"
                maxLength={10}
                type="text"
                name="phoneNumberEmail"
                disabled={isAuthenticateUserLoading}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              className="block text-xs font-medium text-gray-500"
              htmlFor="password"
            >
              {" "}
              Password{" "}
            </label>
            <input
              className="w-full p-2 mt-1 text-sm border-1 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:border-gray-200"
              id="password"
              type="password"
              name="password"
              disabled={isAuthenticateUserLoading}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?{" "}
              <Link href="/create">
                <span className="underline hover:cursor-pointer text-cyan-800 font-bold">
                  Sign up
                </span>
              </Link>
            </p>

            <button
              type="submit"
              disabled={isAuthenticateUserLoading}
              className="inline-block px-4 py-2 ml-3 text-sm font-medium text-white bg-cyan-800 text-primary rounded-md hover:bg-cyan-900"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Index.hideMainLayout = true;

export default Index;
