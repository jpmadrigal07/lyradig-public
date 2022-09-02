import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
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
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import useAuth from "../../hooks/useAuth";

const Mobile = ({ sidebarOpen, setSidebarOpen }) => {
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
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [router.pathname]);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <MainLogoInverted />
              </div>
              <nav
                className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
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
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        aria-current={
                          router.pathname.includes(item.href)
                            ? "page"
                            : undefined
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
                      return item.name !== "Logout" &&
                        item.name !== "Need Help?" ? (
                        <Link href={item.href} key={item.name}>
                          <a
                            href="#"
                            className={classNames(
                              router.pathname.includes(item.href)
                                ? "bg-cyan-800 text-white"
                                : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
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
                            "group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md"
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
                          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 hover:cursor-pointer"
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
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Mobile;
