import { POST, PATCH } from "../constants";
import apiCall from "./apiCall";
import {
  addCondition,
  addConditionWithPagination,
  generateHeaders,
} from "./helpers";
// includes
const BASE = "/api/topUps";

// calls
export const getAllTopUp = (conditions = "") =>
  apiCall(`${BASE}${addCondition(conditions)}`);
export const getPaginatedTopUp = (conditions = "", page = "", limit = "") =>
  apiCall(
    `${BASE}/paginated${addConditionWithPagination(conditions, page, limit)}`,
    generateHeaders()
  );
export const getTopUpTotal = (conditions = "") =>
  apiCall(`${BASE}/total${addCondition(conditions)}`, generateHeaders());
export const addTopUp = (body = null) =>
  apiCall(`${BASE}`, generateHeaders(), POST, body);
export const updateTopUp = (body = null, id = "") =>
  apiCall(`${BASE}/${id}`, generateHeaders(), PATCH, body);
