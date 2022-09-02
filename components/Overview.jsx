import React, { useEffect, useState } from "react";
import { cardsData } from "../utils/constants";
import useAuth from "../hooks/useAuth";
import useTopUp from "../hooks/useTopUp";
import toCurrency from "../utils/toCurrency";
import useWithdraw from "../hooks/useWithdraw";
import useUser from "../hooks/useUser";

const Overview = () => {
  const { verifyLoginData } = useAuth();
  const [updatedCardData, setUpdatedCardData] = useState(cardsData);
  const { topUpTotalData, handleTopUpTotalRequest } = useTopUp();
  const { withdrawTotalData, handleWithdrawTotalRequest } = useWithdraw();
  const { pointsSummaryData, handlePointsSummaryRequest } = useUser();
  useEffect(() => {
    if (verifyLoginData) {
      handleTopUpTotalRequest(verifyLoginData._id);
      handleWithdrawTotalRequest(verifyLoginData._id);
      handlePointsSummaryRequest(verifyLoginData._id);
    }
  }, [
    verifyLoginData,
    handleTopUpTotalRequest,
    handleWithdrawTotalRequest,
    handlePointsSummaryRequest,
  ]);

  useEffect(() => {
    const totalEarnedPointsIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Earned Points"
    );
    const totalEarnedReferralPointsIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Earned Referral Points"
    );
    const totalEarnedDailyPointsIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Earned Daily Points"
    );
    const copyUpdatedCardData = updatedCardData;
    if (
      pointsSummaryData &&
      updatedCardData[totalEarnedPointsIndex].amount === "..."
    ) {
      copyUpdatedCardData[totalEarnedPointsIndex].amount =
        pointsSummaryData.earnedPoints;
      setUpdatedCardData([...copyUpdatedCardData]);
    }
    if (
      pointsSummaryData &&
      updatedCardData[totalEarnedReferralPointsIndex].amount === "..."
    ) {
      copyUpdatedCardData[totalEarnedReferralPointsIndex].amount =
        pointsSummaryData.referralPoints;
      setUpdatedCardData([...copyUpdatedCardData]);
    }
    if (
      pointsSummaryData &&
      updatedCardData[totalEarnedDailyPointsIndex].amount === "..."
    ) {
      copyUpdatedCardData[totalEarnedDailyPointsIndex].amount =
        pointsSummaryData.todayEarnedPoints;
      setUpdatedCardData([...copyUpdatedCardData]);
    }
  }, [pointsSummaryData, updatedCardData]);

  useEffect(() => {
    const totalInvestmentIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Investment"
    );
    if (
      topUpTotalData &&
      updatedCardData[totalInvestmentIndex].amount === "..."
    ) {
      const copyUpdatedCardData = updatedCardData;
      copyUpdatedCardData[totalInvestmentIndex].amount = toCurrency(
        topUpTotalData.price
      );
      setUpdatedCardData([...copyUpdatedCardData]);
    }
  }, [topUpTotalData, updatedCardData]);

  useEffect(() => {
    const totalInvestmentIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Withdrawn Points"
    );
    if (
      withdrawTotalData &&
      updatedCardData[totalInvestmentIndex].amount === "..."
    ) {
      const copyUpdatedCardData = updatedCardData;
      copyUpdatedCardData[totalInvestmentIndex].amount =
        withdrawTotalData.amount;
      setUpdatedCardData([...copyUpdatedCardData]);
    }
  }, [withdrawTotalData, updatedCardData]);

  useEffect(() => {
    const totalAvailablePointsIndex = updatedCardData.findIndex(
      (item) => item.name === "Total Available Points"
    );
    if (
      verifyLoginData &&
      updatedCardData[totalAvailablePointsIndex].amount === "..."
    ) {
      const copyUpdatedCardData = updatedCardData;
      copyUpdatedCardData[totalAvailablePointsIndex].amount =
        verifyLoginData.walletPoints ? verifyLoginData.walletPoints : "0";
      setUpdatedCardData([...copyUpdatedCardData]);
    }
  }, [verifyLoginData, updatedCardData]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {updatedCardData.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {card.amount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href={card.href}
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
