import Cookies from "js-cookie";

export const addCondition = (conditions) => {
  return conditions !== "" ? `?condition=${conditions}` : "";
};

export const addConditionWithPagination = (conditions, page, limit) => {
  let newCondition = "";
  newCondition = conditions !== "" ? `condition=${conditions}` : "";
  newCondition = page !== "" ? `${newCondition}&page=${page}` : newCondition;
  newCondition = limit !== "" ? `${newCondition}&limit=${limit}` : newCondition;
  return `?${newCondition}`;
};

export const generateHeaders = () => {
  const token = Cookies.get("l_auth");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
