import apiCall from "./apiCall";
import { addConditionWithPagination } from "./helpers";
import { generateHeaders } from "./helpers";

// includes
const BASE = "/api/transactions";

// calls
export const getPaginatedTransaction = (
  conditions = "",
  page = "",
  limit = ""
) =>
  apiCall(
    `${BASE}/paginated${addConditionWithPagination(conditions, page, limit)}`,
    generateHeaders()
  );
