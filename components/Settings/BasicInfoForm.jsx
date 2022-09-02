import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Form, Formik } from "formik";
import { basicInfoSchema } from "./formSchema";
import TextField from "../Forms/TextField";
import useUser from "../../hooks/useUser";
import Button from "../Forms/Button";
import * as R from "ramda";

const BasicInfoForm = () => {
  const { verifyLoginData, isVerifyLoginLoading } = useAuth();
  const { triggerUpdateUser, isUpdateUserLoading } = useUser();
  const [defaultValue, setDefaultValue] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (verifyLoginData) {
      const { firstName, lastName, middleName, email } = verifyLoginData;
      setDefaultValue({
        firstName,
        lastName,
        middleName: middleName ? middleName : "",
        email,
      });
    }
  }, [verifyLoginData]);

  const onSubmit = async (values, actions) => {
    if (!R.equals(values, defaultValue)) {
      // strip email
      delete values.email;
      triggerUpdateUser([values, verifyLoginData._id], {
        onSuccess: (data) => {
          setDefaultValue(data);
        },
        onError: () => {
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
        validationSchema={basicInfoSchema}
      >
        {({ values }) => (
          <Form>
            <div className="max-w-6xl mx-auto lg:px-8">
              <div className="bg-white shadow lg:rounded-md">
                <div className="flex flex-col gap-4 px-6 py-4">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Basic Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Basic information of the user.
                    </p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <TextField
                        type="text"
                        name="firstName"
                        id="firstName"
                        disabled={isVerifyLoginLoading || isUpdateUserLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Middle Name (optional)
                      </label>
                      <TextField
                        type="text"
                        name="middleName"
                        id="middleName"
                        disabled={isVerifyLoginLoading || isUpdateUserLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <TextField
                        type="text"
                        name="lastName"
                        id="lastName"
                        disabled={isVerifyLoginLoading || isUpdateUserLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <TextField
                        type="email"
                        name="email"
                        id="email"
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
                  <Button
                    type="submit"
                    disabled={
                      isUpdateUserLoading || R.equals(values, defaultValue)
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

export default BasicInfoForm;
