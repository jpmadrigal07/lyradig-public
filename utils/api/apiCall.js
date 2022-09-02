import axios from "axios";

const apiCall = async (
  endpoint = "",
  headers = {},
  method = "GET",
  body = null
) => {
  const params = {
    method: method,
    url: `${String(process.env.API_URL)}${endpoint}`,
    headers: headers,
  };
  try {
    let res = await axios(
      method === "DELETE" ? params : { ...params, data: body }
    );
    return res.data;
  } catch (err) {
    throw err.response ? err?.response?.data : err.message;
  }
};

export default apiCall;
