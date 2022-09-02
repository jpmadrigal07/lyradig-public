import { POST, PATCH } from "../constants";
import apiCall from "./apiCall";
import { addConditionWithPagination, addCondition } from "./helpers";
import { generateHeaders } from "./helpers";
// includes
const BASE = "/api/withdraws";

// calls
export const addWithdraw = (body = null) =>
  apiCall(`${BASE}`, generateHeaders(), POST, body);
export const getPaginatedWithdraw = (conditions = "", page = "", limit = "") =>
  apiCall(
    `${BASE}/paginated${addConditionWithPagination(conditions, page, limit)}`,
    generateHeaders()
  );
export const getWithdrawTotal = (conditions = "") =>
  apiCall(`${BASE}/total${addCondition(conditions)}`, generateHeaders());
export const updateWithdraw = (body = null, id = "") =>
  apiCall(`${BASE}/${id}`, generateHeaders(), PATCH, body);
