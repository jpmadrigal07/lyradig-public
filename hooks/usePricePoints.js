import { useQuery } from "react-query";
import { getAllPricePoints } from "../utils/api/pricePoints";
import toast from "react-hot-toast";
import minutesToMilliseconds from "../utils/minutesToMilliseconds";

const usePricePoints = () => {
  const { data: pricePointsData, isLoading: isPricePointsLoading } = useQuery(
    "pricePoints",
    async () => await getAllPricePoints(),
    {
      onError: (data) => {
        toast.error(data, {
          id: "pricePoints",
          duration: 3000,
        });
      },
      staleTime: minutesToMilliseconds(60),
    }
  );
  return {
    pricePointsData,
    isPricePointsLoading,
  };
};

export default usePricePoints;
