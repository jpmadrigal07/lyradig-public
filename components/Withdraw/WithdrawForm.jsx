import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import PasswordTextField from "../Forms/PasswordTextField";
import useAuth from "../../hooks/useAuth";
import TextField from "../Forms/TextField";
import { withdrawFormSchema } from "./formSchema";
import * as R from "ramda";
import Button from "../Forms/Button";
import useWithdraw from "../../hooks/useWithdraw";
import PhoneNumberField from "../Forms/PhoneNumberField";

const WithdrawForm = () => {
  const { verifyLoginData } = useAuth();
  const { triggerAddWithdraw, isAddWithdrawLoading } = useWithdraw();
  const [walletPoints, setWalletPoints] = useState(0);
  const defaultValue = {
    amount: "",
    phoneNumber: "",
    password: "",
  };
  const onSubmit = async (values, actions) => {
    if (!R.equals(values, defaultValue)) {
      const updatedValues = {
        ...values,
        phoneNumber: `+63${values.phoneNumber}`,
        userId: verifyLoginData._id,
      };
      triggerAddWithdraw(updatedValues, {
        onSuccess: () => {
          actions.resetForm();
        },
      });
    }
  };
  useEffect(() => {
    if (verifyLoginData) {
      setWalletPoints(verifyLoginData.walletPoints);
    }
  }, [verifyLoginData]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={defaultValue}
        onSubmit={onSubmit}
        validationSchema={withdrawFormSchema}
      >
        {({ values }) => (
          <Form>
            <div className="max-w-6xl mx-auto lg:px-8">
              <div className="bg-white shadow lg:rounded-md">
                <div className="flex flex-col gap-4 px-6 py-4">
                  <div>
                    <h3 className="text-2xl leading-6 font-medium text-green-400">
                      {walletPoints}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Above is your available Points (1 point = ₱1.00)
                    </p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        How much points do you want to withdraw?
                      </label>
                      <TextField
                        type="number"
                        name="amount"
                        id="amount"
                        disabled={isAddWithdrawLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-red-500"
                      >
                        What is your registered phone number in our system?
                      </label>
                      <PhoneNumberField
                        id="phoneNumber"
                        autoComplete="off"
                        name="phoneNumber"
                        disabled={isAddWithdrawLoading}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-red-500"
                      >
                        What is your password in our system?
                      </label>
                      <PasswordTextField
                        name="password"
                        id="password"
                        disabled={isAddWithdrawLoading}
                      />
                      <p className="text-gray-400 italic text-sm mt-5">
                        Once approved, withdrawn points will be sent to your
                        GCash account through your registered phone number in
                        our system.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3 px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
                  <Button
                    type="submit"
                    disabled={
                      isAddWithdrawLoading || R.equals(values, defaultValue)
                    }
                  >
                    Request
                  </Button>
                  <Link href="/withdraw">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Cancel
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

export default WithdrawForm;
