import { useMutation, QueryClient, useQuery } from "react-query";
import {
  updateUser,
  updateUserPassword,
  getPointsSummary,
  getPaginatedStaff,
} from "../utils/api/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const useUser = () => {
  const queryClient = new QueryClient();
  const [pointsSummaryId, setPointsSummaryId] = useState(null);
  const [paginatedUserId, setPaginatedUserId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { mutate: triggerUpdateUser, isLoading: isUpdateUserLoading } =
    useMutation(async (data) => await updateUser(data[0], data[1]), {
      onSuccess: () => {
        queryClient.invalidateQueries("verifyAuth");
        toast.success("Successfully updated", {
          id: "updateUser",
          duration: 3000,
        });
      },
      onError: (err) => {
        toast.error(err, {
          id: "updateUser",
          duration: 5000,
        });
      },
    });
  const {
    mutate: triggerUpdateUserPassword,
    isLoading: isUpdateUserPasswordLoading,
  } = useMutation(async (data) => await updateUserPassword(data[0], data[1]), {
    onSuccess: () => {
      toast.success("Successfully updated", {
        id: "updateUserPassword",
        duration: 3000,
      });
    },
    onError: (err) => {
      toast.error(err, {
        id: "updateUserPassword",
        duration: 5000,
      });
    },
  });
  const {
    data: pointsSummaryData,
    isLoading: isPointsSummaryLoading,
    refetch: refetchPointsSummary,
  } = useQuery(
    "pointsSummary",
    async () => {
      const condition = pointsSummaryId
        ? `{"userId":"${pointsSummaryId}"}`
        : ``;
      return await getPointsSummary(condition);
    },
    {
      enabled: false,
    }
  );
  const {
    data: staffPaginatedData,
    isLoading: isStaffPaginatedLoading,
    refetch: refetchStaffPaginated,
  } = useQuery(
    "staff",
    async () => {
      const condition = paginatedUserId
        ? `{"userId":"${paginatedUserId}", "userType": "Staff"}`
        : ``;
      return await getPaginatedStaff(condition, pageNumber, "10");
    },
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (pointsSummaryId) {
      refetchPointsSummary();
    }
  }, [pointsSummaryId, refetchPointsSummary]);
  useEffect(() => {
    if (pointsSummaryId) {
      refetchPointsSummary();
    }
  }, [pointsSummaryId, refetchPointsSummary]);
  useEffect(() => {
    if (pageNumber && pageNumber > 0 && paginatedUserId) {
      refetchStaffPaginated();
    }
    return () => {
      setPageNumber(0);
      setPaginatedUserId(null);
    };
  }, [pageNumber, paginatedUserId, refetchStaffPaginated]);
  const handlePointsSummaryRequest = (userId) => {
    setPointsSummaryId(userId);
  };
  const handleStaffRequest = (newPageNumber, newUserId) => {
    setPageNumber(newPageNumber);
    setPaginatedUserId(newUserId);
  };
  return {
    triggerUpdateUser,
    isUpdateUserLoading,
    triggerUpdateUserPassword,
    isUpdateUserPasswordLoading,
    pointsSummaryData,
    isPointsSummaryLoading,
    handlePointsSummaryRequest,
    staffPaginatedData,
    isStaffPaginatedLoading,
    refetchStaffPaginated,
    handleStaffRequest,
  };
};

export default useUser;
