import * as yup from "yup";

const requiredMessage = "This field is required";

export const withdrawFormSchema = yup.object().shape({
  amount: yup.string().required(requiredMessage),
  phoneNumber: yup.string().required(requiredMessage),
  password: yup.string().required(requiredMessage),
});
