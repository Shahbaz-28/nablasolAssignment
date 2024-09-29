import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Step2 = ({ setSubmitStep1, onNext, formData, updateFormData }) => {
  useEffect(() => {
    const savedData = localStorage.getItem("accountData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (JSON.stringify(parsedData.stepp2) !== JSON.stringify(formData)) {
        updateFormData(parsedData.stepp2 || {});
      }
    }
  }, [formData, updateFormData]);

  const initialValues = {
    brandName: formData.brandName || "",
    brandType: formData.brandType || "",
    streetAddress: formData.streetAddress || "",
    city: formData.city || "",
    zipCode: formData.zipCode || "",
    taxId: formData.taxId || "",
    agreementSigned: formData.agreementSigned || false,
  };

  const validationSchema = Yup.object({
    brandName: Yup.string().required("Brand Name is required"),
    brandType: Yup.string().required("Brand Type is required"),
    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip Code is required"),
    taxId: Yup.string().required("Tax ID is required"),
  });

  let formikSubmit;

  useEffect(() => {
    setSubmitStep1(() => formikSubmit);
  }, [formikSubmit, setSubmitStep1]);

  return (
    <div>
      <h1 className="text-center mb-4 text-white font-semi-bold text-2xl">
        Create New Acoount
      </h1>
      <div className="w-full bg-white rounded-lg shadow-lg p-8 lg:p-16 sm:p-12">
        <h1 className="text-center text-gray-400 font-medium ">Step 2</h1>
        <h1 className="text-center text-gray-600 font-medium">
          Business Information
        </h1>
        <h1 className="text-[12px] font-semibold text-gray-500 text-center mb-2">
          Please, enter information about your company.
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            updateFormData({ stepp2: values });
            localStorage.setItem(
              "accountData",
              JSON.stringify({ stepp2: values })
            );
            onNext();
          }}
        >
          {({ submitForm }) => {
            formikSubmit = submitForm;

            return (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brand Name */}
                  <div>
                    <label
                      htmlFor="brandName"
                      className="block text-sm text-gray-700"
                    >
                      Brand Name*
                    </label>
                    <Field
                      type="text"
                      name="brandName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Brand Name"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="brandName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Brand Type */}
                  <div>
                    <label
                      htmlFor="brandType"
                      className="block text-sm text-gray-700"
                    >
                      Brand Type*
                    </label>
                    <Field
                      as="select"
                      name="brandType"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                    >
                      <option value="" label="Select Brand Type" />
                      <option value="Local" label="Local" />
                      <option value="National" label="National" />
                    </Field>
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="brandType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor="streetAddress"
                      className="block text-sm text-gray-700"
                    >
                      Street Address*
                    </label>
                    <Field
                      type="text"
                      name="streetAddress"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Street Address"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="streetAddress"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm text-gray-700"
                    >
                      City*
                    </label>
                    <Field
                      type="text"
                      name="city"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your City"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm text-gray-700"
                    >
                      Zip Code*
                    </label>
                    <Field
                      type="text"
                      name="zipCode"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Zip Code"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="zipCode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Tax ID */}
                  <div>
                    <label
                      htmlFor="taxId"
                      className="block text-sm text-gray-700"
                    >
                      Tax ID*
                    </label>
                    <Field
                      type="text"
                      name="taxId"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Tax ID"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="taxId"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="mt-7">
                  <h3 className="text-sm font-semibold   text-[#ACD2FF] mb-2">
                    DOCUMENTS
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Once the following documents are signed, you'll be ready to
                    get started
                  </p>

                  {/* First Document - Electronically signed agreement */}

                  <div className=" flex  justify-between items-center mb-2">
                    <div className="flex items-center justify-between w-[560px] border border-gray-200 rounded-lg px-4 ">
                      <label className="block text-gray-700 text-sm">
                        Electronically sign the agreement(s)
                      </label>
                      <div className="">
                        <button
                          type="button"
                          className="w-8 h-8 text-green-500"
                        >
                          &#10003;
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="bg-[#7D89EC] px-3 py-1 rounded-md hover:bg-[#A0B3F1] transition duration-200 ease-in-out">
                        <span className="text-white font-semibold text-xl">
                          {">"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Second Document - Not Signed Document */}

                  <div className=" flex  justify-between items-center mb-2">
                    <div className="flex items-center justify-between w-[560px] border border-gray-200 rounded-lg px-4 ">
                      <label className="block text-gray-700 text-sm">
                        Non-adult beverage Kroger market supplier waiver and
                        release
                      </label>
                      <div className="">
                        <button
                          type="button"
                          className="w-8 h-8 font-bold text-red-500"
                        >
                          &#10005;{" "}
                          {/* This is the HTML code for a red cross sign */}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="bg-[#7D89EC] px-3 py-1 rounded-md hover:bg-[#A0B3F1] transition duration-200 ease-in-out">
                        <span className="text-white font-semibold text-xl">
                          {">"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* COI PDF Upload Section */}
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-[#ACD2FF] mb-2">
                    COI PDF UPLOAD
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Once the following documents are signed, you'll be ready to
                    get started
                  </p>

                  {/* COI Electronically Signed */}
                  <div className=" flex  justify-between items-center mb-2">
                    <div className="flex items-center justify-between w-[560px] border border-gray-200 rounded-lg px-4 ">
                      <label className="block text-gray-700 text-sm">
                        Electronically sign the agreement(s)
                      </label>
                      <div className="">
                        <button
                          type="button"
                          className="w-8 h-8 text-green-500"
                        >
                          &#10003;
                        </button>
                      </div>
                    </div>
                    <div>
                      <button className="bg-[#7D89EC] px-3 py-1 rounded-md hover:bg-[#A0B3F1] transition duration-200 ease-in-out">
                        <span className="text-white font-semibold text-xl">
                          {">"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Step2;
