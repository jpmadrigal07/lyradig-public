import moment from "moment";

export const tableDate = (date) => {
  return moment(date).format("MMM DD, YYYY hh:mm A");
};
