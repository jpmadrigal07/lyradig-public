import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addTopUp,
  getPaginatedTopUp,
  getTopUpTotal,
  updateTopUp,
} from "../utils/api/topUp";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTopUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(0);
  const [paginatedUserId, setPaginatedUserId] = useState(null);
  const [totalUserId, setTotalUserId] = useState(null);
  const { mutate: triggerAddTopUp, isLoading: isAddTopUpLoading } = useMutation(
    async (data) => await addTopUp(data),
    {
      onSuccess: () => {
        toast.success("Successfully submitted top up", {
          id: "addTopUp",
          duration: 3000,
        });
        router.push("/top-up");
      },
      onError: (err) => {
        toast.error(err, {
          id: "addTopUp",
          duration: 5000,
        });
      },
    }
  );
  const { mutate: triggerUpdateTopUp, isLoading: isUpdateTopUpLoading } =
    useMutation(async (data) => await updateTopUp(data[0], data[1]), {
      onSuccess: () => {
        toast.success("Successfully updated top up", {
          id: "updateTopUp",
          duration: 3000,
        });
      },
      onError: (err) => {
        toast.error(err, {
          id: "updateTopUp",
          duration: 5000,
        });
      },
    });
  const {
    data: topUpPaginatedData,
    isLoading: isTopUpPaginatedLoading,
    refetch: refetchTopUpPaginated,
  } = useQuery(
    ["topUp", pageNumber],
    async () => {
      const condition = paginatedUserId
        ? `{"userId":"${paginatedUserId}"}`
        : ``;
      return await getPaginatedTopUp(condition, pageNumber, "10");
    },
    {
      enabled: false,
    }
  );
  const {
    data: topUpTotalData,
    isLoading: isTopUpTotalLoading,
    refetch: refetchTopUpTotal,
  } = useQuery(
    "topUpTotal",
    async () => {
      const condition = totalUserId
        ? `{"userId":"${totalUserId}", "status": "Approved"}`
        : ``;
      return await getTopUpTotal(condition);
    },
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (pageNumber && pageNumber > 0 && paginatedUserId) {
      refetchTopUpPaginated();
    }
    return () => {
      setPageNumber(0);
      setPaginatedUserId(null);
    };
  }, [pageNumber, paginatedUserId, refetchTopUpPaginated]);
  useEffect(() => {
    if (totalUserId) {
      refetchTopUpTotal();
    }
    return () => {
      setTotalUserId(null);
    };
  }, [totalUserId, refetchTopUpTotal]);
  const handleTopUpRequest = (newPageNumber, newUserId) => {
    setPageNumber(newPageNumber);
    setPaginatedUserId(newUserId);
  };
  const handleTopUpTotalRequest = (newUserId) => {
    setTotalUserId(newUserId);
  };
  const invalidateTopUpPage = (pageNumber) => {
    queryClient.invalidateQueries(["topUp", pageNumber]);
  };
  return {
    triggerAddTopUp,
    isAddTopUpLoading,
    topUpPaginatedData,
    isTopUpPaginatedLoading,
    refetchTopUpPaginated,
    handleTopUpRequest,
    triggerUpdateTopUp,
    isUpdateTopUpLoading,
    invalidateTopUpPage,
    topUpTotalData,
    isTopUpTotalLoading,
    refetchTopUpTotal,
    handleTopUpTotalRequest,
  };
};

export default useTopUp;
