import { POST } from "../constants";
import apiCall from "./apiCall";
import { addCondition } from "./helpers";
import { generateHeaders } from "./helpers";
// includes
const BASE = "/api/pricePoints";

// calls
export const getAllPricePoints = (conditions = "") =>
  apiCall(`${BASE}${addCondition(conditions)}`, generateHeaders());
export const addPricePoint = (body = null) =>
  apiCall(`${BASE}`, generateHeaders(), POST, body);
