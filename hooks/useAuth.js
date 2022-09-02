import { useMutation, useQuery } from "react-query";
import { verifyAuth, authenticateUser, addUser } from "../utils/api/user";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { STALE_TIME } from "../utils/constants";

const useAuth = () => {
  const router = useRouter();
  const {
    data: verifyLoginData,
    isLoading: isVerifyLoginLoading,
    refetch: refetchVerifyLogin,
  } = useQuery(
    "verifyAuth",
    async () => {
      const token = Cookies.get("l_auth");
      return await verifyAuth(token);
    },
    {
      onError: (data) => {
        if (router.pathname !== "/" && router.pathname !== "/create") {
          toast.error(data, {
            id: "authenticateUser",
            duration: 3000,
          });
          router.push("/");
        }
      },
      enabled: false,
      staleTime: STALE_TIME,
    }
  );
  const {
    mutate: triggerAuthenticateUser,
    isLoading: isAuthenticateUserLoading,
  } = useMutation(async (data) => await authenticateUser(data), {
    onSuccess: (data) => {
      Cookies.set("l_auth", data.token);
      toast.success("You are now authenticated", {
        id: "authenticateUser",
        duration: 3000,
      });
      if (router.pathname === "/" && data.userType === "User") {
        router.push("/home");
      } else {
        router.push("/top-ups");
      }
    },
    onError: (err) => {
      toast.error(err, {
        id: "authenticateUser",
        duration: 5000,
      });
    },
  });
  const { mutate: triggerAddUser, isLoading: isAddUserLoading } = useMutation(
    async (data) => await addUser(data),
    {
      onSuccess: () => {
        toast.success("Successfully created! You can now login", {
          id: "addUser",
          duration: 3000,
        });
        router.push("/");
      },
      onError: (err) => {
        toast.error(err, {
          id: "addUser",
          duration: 5000,
        });
      },
    }
  );
  useEffect(() => {
    if (isAuthenticateUserLoading) {
      toast.loading("Logging in...", {
        id: "authenticateUser",
      });
    }
  }, [isAuthenticateUserLoading]);
  useEffect(() => {
    if (isAddUserLoading) {
      toast.loading("Loading...", {
        id: "addUser",
      });
    }
  }, [isAddUserLoading]);
  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !== "/create") {
      refetchVerifyLogin();
    }
  }, [refetchVerifyLogin, router]);
  return {
    verifyLoginData,
    triggerAuthenticateUser,
    triggerAddUser,
    isVerifyLoginLoading,
    refetchVerifyLogin,
    isAuthenticateUserLoading,
    isAddUserLoading,
  };
};

export default useAuth;
