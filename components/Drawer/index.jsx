import React, { useEffect, useState } from "react";
import {
  navigationData,
  secondaryNavigationData,
  navigationDataAdmin,
  secondaryNavigationDataAdmin,
  navigationDataStaff,
} from "../../utils/constants";
import classNames from "../../utils/classNames";
import MainLogoInverted from "../../assets/svg/MainLogoInverted";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "react-query";

const Drawer = () => {
  const queryClient = useQueryClient();
  const { verifyLoginData } = useAuth();
  const [mainNavigation, setMainNavigation] = useState([]);
  const [secondNavigation, setSecondNavigation] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (verifyLoginData) {
      if (verifyLoginData.userType === "User") {
        setMainNavigation(navigationData);
        setSecondNavigation(secondaryNavigationData);
      } else if (verifyLoginData.userType === "Admin") {
        setMainNavigation(navigationDataAdmin);
        setSecondNavigation(secondaryNavigationDataAdmin);
      } else if (verifyLoginData.userType === "Staff") {
        setMainNavigation(navigationDataStaff);
        setSecondNavigation(secondaryNavigationDataAdmin);
      }
    }
  }, [verifyLoginData]);

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <MainLogoInverted />
        </div>
        <nav
          className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="px-2 space-y-1">
            {mainNavigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  href="#"
                  className={classNames(
                    router.pathname.includes(item.href)
                      ? "bg-cyan-800 text-white"
                      : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  )}
                  aria-current={
                    router.pathname.includes(item.href) ? "page" : undefined
                  }
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6">
            <div className="px-2 space-y-1">
              {secondNavigation.map((item) => {
                return item.name !== "Logout" && item.name !== "Need Help?" ? (
                  <Link href={item.href} key={item.name}>
                    <a
                      href="#"
                      className={classNames(
                        router.pathname.includes(item.href)
                          ? "bg-cyan-800 text-white"
                          : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                        "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ) : item.name === "Need Help?" ? (
                  <a
                    key={item.name}
                    className={classNames(
                      router.pathname.includes(item.href)
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    target="_blank"
                    href={item.href}
                    rel="noopener noreferrer"
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ) : (
                  <span
                    key={item.name}
                    onClick={() => {
                      queryClient.invalidateQueries();
                      queryClient.clear();
                      Cookies.remove("l_auth");
                      router.push("/");
                    }}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 hover:cursor-pointer"
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Drawer;
