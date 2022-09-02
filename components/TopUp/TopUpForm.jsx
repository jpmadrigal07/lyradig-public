import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as R from "ramda";
import { topUpFormSchema } from "./formSchema";
import TextField from "../Forms/TextField";
import SelectField from "../Forms/SelectField";
import usePricePoints from "../../hooks/usePricePoints";
import toCurrency from "../../utils/toCurrency";
import useTopUp from "../../hooks/useTopUp";
import useAuth from "../../hooks/useAuth";
import Button from "../Forms/Button";

const TopUpForm = () => {
  const { verifyLoginData } = useAuth();
  const { pricePointsData, isPricePointsLoading } = usePricePoints();
  const { triggerAddTopUp, isAddTopUpLoading } = useTopUp();
  const [optionValues, setOptionValues] = useState([]);
  const [defaultValue, setDefaultValue] = useState({
    pricePoints: "",
    referenceNumber: "",
  });
  useEffect(() => {
    if (pricePointsData) {
      setOptionValues(
        pricePointsData.map((pricePoint, index) => {
          if (index === 0) {
            setDefaultValue({
              pricePoints: pricePoint._id,
              referenceNumber: "",
            });
          }
          return {
            text: `Top up ${toCurrency(pricePoint.price)} - Earn ${
              pricePoint.points
            } points daily`,
            value: pricePoint._id,
          };
        })
      );
    }
  }, [pricePointsData]);

  const onSubmit = async (values, actions) => {
    if (!R.equals(values, defaultValue)) {
      const updatedValues = {
        ...values,
        userId: verifyLoginData._id,
      };
      triggerAddTopUp(updatedValues, {
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
        validationSchema={topUpFormSchema}
      >
        {({ values }) => (
          <Form>
            <div className="max-w-6xl mx-auto lg:px-8">
              <div className="bg-white shadow lg:rounded-md">
                <div className="flex-1 flex flex-col gap-4 px-6 py-4">
                  <div>
                    <h3 className="text-2xl mb-2 leading-6 font-medium text-gray-700">
                      +63 956 671 4980 (SHEERA P.)
                    </h3>
                    <h3 className="text-2xl leading-6 font-medium text-gray-700">
                      +63 906 733 3754 (ZHEENA P.)
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      These are the official GCash number of Lyradig, please
                      send your top up payment here.
                    </p>
                  </div>
                  <hr />
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        How much did you send to the GCash number above?
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <SelectField
                          id="pricePoints"
                          name="pricePoints"
                          options={optionValues}
                          disabled={isAddTopUpLoading || isPricePointsLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        GCash transaction reference number
                      </label>
                      <TextField
                        type="text"
                        name="referenceNumber"
                        id="referenceNumber"
                        disabled={isAddTopUpLoading}
                      />
                      <p className="text-gray-400 italic text-sm mt-5">
                        Once approved, top up points will immediately reflect to
                        your account.
                      </p>
                      <p className="text-red-400 italic text-sm mt-3 font-bold">
                        Note: By submitting this form, you are agreeing that we
                        are not responsible for any loss of funds in your GCash
                        account or wrong sending of funds in our official GCash
                        number.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3 px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-md">
                  <Button
                    type="submit"
                    disabled={
                      isAddTopUpLoading || R.equals(values, defaultValue)
                    }
                  >
                    Submit
                  </Button>
                  <Link href="/top-up">
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

export default TopUpForm;
