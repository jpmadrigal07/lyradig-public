import React from "react";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { Form, Formik } from "formik";
import { changePasswordSchema } from "./formSchema";
import PasswordTextField from "../Forms/PasswordTextField";
import Button from "../Forms/Button";
import * as R from "ramda";

const ChangePasswordForm = () => {
  const { verifyLoginData } = useAuth();
  const { triggerUpdateUserPassword, isUpdateUserPasswordLoading } = useUser();
  const defaultValue = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = async (values, actions) => {
    if (!R.equals(values, defaultValue)) {
      triggerUpdateUserPassword([values, verifyLoginData._id], {
        onSuccess: () => {
          actions.resetForm();
        },
      });
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={defaultValue}
        onSubmit={onSubmit}
        validationSchema={changePasswordSchema}
      >
        {({ values }) => (
          <Form>
            <div className="mt-5 max-w-6xl mx-auto lg:px-8">
              <div className="bg-white shadow lg:rounded-md">
                <div className="flex flex-col gap-4 px-6 py-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Change Password
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You can see the password by clicking the eye.
                    </p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="relative">
                      <label
                        className="block text-xs font-medium text-gray-500"
                        htmlFor="password"
                      >
                        {" "}
                        Old Password{" "}
                      </label>
                      <PasswordTextField
                        name="oldPassword"
                        id="oldPassword"
                        disabled={isUpdateUserPasswordLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="relative">
                      <label
                        className="block text-xs font-medium text-gray-500"
                        htmlFor="password"
                      >
                        {" "}
                        New Password{" "}
                      </label>
                      <PasswordTextField
                        name="newPassword"
                        id="newPassword"
                        disabled={isUpdateUserPasswordLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
                  <Button
                    type="submit"
                    disabled={
                      isUpdateUserPasswordLoading ||
                      R.equals(values, defaultValue)
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
