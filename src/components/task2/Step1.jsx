import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Stepper from "react-stepper-horizontal";

const Step1 = ({ setSubmitStep1, onNext, formData, updateFormData, step }) => {
  useEffect(() => {
    const savedData = localStorage.getItem("accountData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (JSON.stringify(parsedData.stepp1) !== JSON.stringify(formData)) {
        updateFormData(parsedData.stepp1 || {});
      }
    }
  }, [formData, updateFormData]);

  const initialValues = {
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    email: formData.email || "",
    phone: formData.phone || "",
    password: formData.password || "",
    confirmPassword: formData.confirmPassword || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  let formikSubmit;

  useEffect(() => {
    setSubmitStep1(() => formikSubmit);
  }, [formikSubmit, setSubmitStep1]);

  return (
    <div>
      <h1 className="text-center mb-4 text-white font-semi-bold text-2xl">
        Create New Account
      </h1>
      <div className="w-full bg-white rounded-lg shadow-lg p-8">
        <Stepper
          steps={[
            { title: "Step 1: Profile" },
            { title: "Step 2: Business Information" },
          ]}
          activeStep={step - 1}
          completeColor="#7D89EC"
          activeColor="#3856b8"
          defaultTitleColor="#d3d3d3"
          completeBarColor="#7D89EC"
        />
        <h1 className="text-center text-gray-500 font-medium mb-4">Step 1</h1>
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-2">
          Your Profile
        </h1>
        <p className="text-center text-[10px] lg:text-[16px] text-gray-500 mb-2 lg:mb-4">
          Enter the login information for your account. You will be <br /> able
          to create additional users after registering.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("account Data", values);
            updateFormData({ stepp1: values });
            localStorage.setItem(
              "accountData",
              JSON.stringify({ stepp1: values })
            );

            onNext();
          }}
        >
          {({ submitForm }) => {
            formikSubmit = submitForm;

            return (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm text-gray-700"
                    >
                      First Name*
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your First Name"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm text-gray-700"
                    >
                      Last Name*
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Last Name"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-700"
                    >
                      Email*
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Email"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-gray-700"
                    >
                      Phone Number*
                    </label>
                    <Field
                      type="text"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Input Your Phone Number"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-700"
                    >
                      Password*
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Create Password"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm text-gray-700"
                    >
                      Confirm Password*
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                      placeholder="Confirm Your Password"
                    />
                    <div className="h-[5px]">
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
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

export default Step1;
