import * as yup from "yup";

const requiredMessage = "This field is required";

export const topUpFormSchema = yup.object().shape({
  pricePoints: yup.string().required(requiredMessage),
  referenceNumber: yup.string().required(requiredMessage),
});
