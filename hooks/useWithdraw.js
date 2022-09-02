import { useMutation, useQuery } from "react-query";
import {
  addWithdraw,
  getPaginatedWithdraw,
  getWithdrawTotal,
  updateWithdraw,
} from "../utils/api/withdraw";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useWithdraw = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(0);
  const [paginatedUserId, setPaginatedUserId] = useState(null);
  const [totalUserId, setTotalUserId] = useState(null);
  const { mutate: triggerAddWithdraw, isLoading: isAddWithdrawLoading } =
    useMutation(async (data) => await addWithdraw(data), {
      onSuccess: () => {
        toast.success("Successfully requested withdraw", {
          id: "addWithdraw",
          duration: 3000,
        });
        router.push("/withdraw");
      },
      onError: (err) => {
        toast.error(err, {
          id: "addWithdraw",
          duration: 5000,
        });
      },
    });
  const { mutate: triggerUpdateWithdraw, isLoading: isUpdateWithdrawLoading } =
    useMutation(async (data) => await updateWithdraw(data[0], data[1]), {
      onSuccess: () => {
        toast.success("Successfully updated withdrawal", {
          id: "updateWithdraw",
          duration: 3000,
        });
      },
      onError: (err) => {
        toast.error(err, {
          id: "updateWithdraw",
          duration: 5000,
        });
      },
    });
  const {
    data: withdrawPaginatedData,
    isLoading: isWithdrawPaginatedLoading,
    refetch: refetchWithdrawPaginated,
  } = useQuery(
    ["withdraws", pageNumber],
    async () => {
      const condition = paginatedUserId
        ? `{"userId":"${paginatedUserId}"}`
        : ``;
      return await getPaginatedWithdraw(condition, pageNumber, "10");
    },
    {
      enabled: false,
    }
  );
  const {
    data: withdrawTotalData,
    isLoading: isWithdrawTotalLoading,
    refetch: refetchWithdrawTotal,
  } = useQuery(
    "withdrawTotal",
    async () => {
      const condition = totalUserId
        ? `{"userId":"${totalUserId}", "status": "Approved"}`
        : ``;
      return await getWithdrawTotal(condition);
    },
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (pageNumber && pageNumber > 0 && paginatedUserId) {
      refetchWithdrawPaginated();
    }
  }, [pageNumber, paginatedUserId, refetchWithdrawPaginated]);
  useEffect(() => {
    if (totalUserId) {
      refetchWithdrawTotal();
    }
  }, [totalUserId, refetchWithdrawTotal]);
  const handleWithdrawRequest = (newPageNumber, newUserId) => {
    setPageNumber(newPageNumber);
    setPaginatedUserId(newUserId);
  };
  const handleWithdrawTotalRequest = (newUserId) => {
    setTotalUserId(newUserId);
  };
  return {
    triggerAddWithdraw,
    isAddWithdrawLoading,
    handleWithdrawRequest,
    withdrawPaginatedData,
    isWithdrawPaginatedLoading,
    refetchWithdrawPaginated,
    handleWithdrawTotalRequest,
    withdrawTotalData,
    isWithdrawTotalLoading,
    refetchWithdrawTotal,
    triggerUpdateWithdraw,
    isUpdateWithdrawLoading,
  };
};

export default useWithdraw;
