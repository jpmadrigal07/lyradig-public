import * as yup from "yup";

const requiredMessage = "This field is required";

export const basicInfoSchema = yup.object().shape({
  firstName: yup.string().required(requiredMessage),
  middleName: yup.string(),
  lastName: yup.string().required(requiredMessage),
  email: yup.string().email().required(requiredMessage),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(requiredMessage),
  newPassword: yup.string().required(requiredMessage),
});
