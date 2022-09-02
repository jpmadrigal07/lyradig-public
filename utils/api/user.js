import { PATCH, POST, PUT } from "../constants";
import apiCall from "./apiCall";
import {
  addCondition,
  generateHeaders,
  addConditionWithPagination,
} from "./helpers";
// includes
const BASE = "/api/users";

// calls
export const getAllUser = (conditions = "") =>
  apiCall(`${BASE}${addCondition(conditions)}`);
export const getPointsSummary = (conditions = "") =>
  apiCall(
    `${BASE}/pointsSummary${addCondition(conditions)}`,
    generateHeaders()
  );
export const getPaginatedStaff = (conditions = "", page = "", limit = "") =>
  apiCall(
    `${BASE}/paginated${addConditionWithPagination(conditions, page, limit)}`,
    generateHeaders()
  );
export const addUser = (body = null) =>
  apiCall(`${BASE}`, generateHeaders(), POST, body);
export const verifyAuth = (token = null) =>
  apiCall(`${BASE}/verifyAuth?token=${token}`);
export const authenticateUser = (body = null) =>
  apiCall(`${BASE}/auth`, generateHeaders(), POST, body);
export const updateUser = (body = null, id = "") =>
  apiCall(`${BASE}/${id}`, generateHeaders(), PATCH, body);
export const updateUserPassword = (body = null, id = "") =>
  apiCall(`${BASE}/updatePassword/${id}`, generateHeaders(), PUT, body);
