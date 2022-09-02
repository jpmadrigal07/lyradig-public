import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { basicInfoSchema } from "./formSchema";
import TextField from "../Forms/TextField";
import PhoneNumberField from "../Forms/PhoneNumberField";
import useUser from "../../hooks/useUser";
import Button from "../Forms/Button";
import * as R from "ramda";
import Link from "next/link";

const BasicInfoForm = ({ staffId }) => {
  const { staffPaginatedData } = useUser();
  const { triggerUpdateUser, isUpdateUserLoading } = useUser();
  const [defaultValue, setDefaultValue] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (staffPaginatedData) {
      const selectedStaff = staffPaginatedData.items.find(
        (staff) => staff._id === staffId
      );
      const { firstName, lastName, middleName, email, phoneNumber } =
        selectedStaff;
      setDefaultValue({
        firstName,
        lastName,
        middleName: middleName ? middleName : "",
        email,
        phoneNumber,
      });
    }
  }, [staffPaginatedData, staffId]);

  const onSubmit = async (values, actions) => {
    if (!R.equals(values, defaultValue) && staffPaginatedData) {
      const updatedValues = {
        ...values,
        ...(values.phoneNumber
          ? { phoneNumber: `+63${values.phoneNumber}` }
          : {}),
      };
      triggerUpdateUser([updatedValues, staffId], {
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
                        disabled={isUpdateUserLoading}
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
                        disabled={isUpdateUserLoading}
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
                        disabled={isUpdateUserLoading}
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
                        disabled={isUpdateUserLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number (e.g. 9501234567){" "}
                      </label>
                      <PhoneNumberField
                        id="phoneNumber"
                        autoComplete="off"
                        name="phoneNumber"
                        disabled={isUpdateUserLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3 px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
                  <Button
                    type="submit"
                    disabled={
                      isUpdateUserLoading ||
                      R.equals(values, defaultValue) ||
                      !staffPaginatedData
                    }
                  >
                    Save
                  </Button>
                  <Link href="/staffs">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Back
                    </a>
                  </Link>
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
