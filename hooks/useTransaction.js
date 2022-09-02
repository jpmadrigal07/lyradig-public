import { useQuery } from "react-query";
import { getPaginatedTransaction } from "../utils/api/transaction";
import { useEffect, useState } from "react";

const useTransaction = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [paginatedUserId, setPaginatedUserId] = useState(null);
  const {
    data: transactionPaginatedData,
    isLoading: isTransactionPaginatedLoading,
    refetch: refetchTransactionPaginated,
  } = useQuery(
    ["transaction", pageNumber],
    async () => {
      const condition = paginatedUserId
        ? `{"userId":"${paginatedUserId}"}`
        : ``;
      return await getPaginatedTransaction(condition, pageNumber, "10");
    },
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (pageNumber && pageNumber > 0 && paginatedUserId) {
      refetchTransactionPaginated();
    }
  }, [pageNumber, paginatedUserId, refetchTransactionPaginated]);
  const handleTransactionRequest = (newPageNumber, newUserId) => {
    setPageNumber(newPageNumber);
    setPaginatedUserId(newUserId);
  };
  return {
    transactionPaginatedData,
    isTransactionPaginatedLoading,
    handleTransactionRequest,
  };
};

export default useTransaction;
