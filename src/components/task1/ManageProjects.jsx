import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FaUserFriends, FaUsers, FaUserShield } from "react-icons/fa";
import StepIndicator from "./StepIndicator";

const ManageProjects = ({ prevStep, nextStep, formData, updateFormData, step }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Formik
      initialValues={{ manage: "" }}
      onSubmit={(values) => {
        console.log("Selected Option:", values.manage);
        updateFormData({ manageProjects: values.manage });
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...formData, manageProjects: values.manage })
        );
        nextStep();
      }}
    >
      {({ setFieldValue, values }) => (
        <div className="flex lg:mt-8 justify-center">
          <div className="bg-white w-[450px] min-h-[500px] h-screen lg:h-auto rounded-xl shadow-lg p-6 md:p-5">
            {/* Close button */}
            <div className="flex justify-end">
              <button className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <h2 className="text-xl font-semibold text-center mb-2">
              Who can manage projects
            </h2>

            <p className="text-sm text-gray-500 text-center mb-6">
              Don't panic — You can also customize this permission in settings
            </p>

            {/* Options 1 */}
            <div className="space-y-4">
              <div
                className={`cursor-pointer border rounded-lg p-4 flex items-center justify-between ${
                  selectedOption === "everyone"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedOption("everyone");
                  setFieldValue("manage", "everyone");
                }}
              >
                <div className="flex items-center space-x-3">
                  <FaUserFriends className="text-lg" />
                  <div>
                    <p className="text-sm font-semibold">Everyone</p>
                    <p className="text-xs text-gray-500">
                      All users can now see it, but guests cannot access the
                      projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div
                className={`cursor-pointer border rounded-lg p-4 flex items-center justify-between ${
                  selectedOption === "admins"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedOption("admins");
                  setFieldValue("manage", "admins");
                }}
              >
                <div className="flex items-center space-x-3">
                  <FaUserShield className="text-lg" />
                  <div>
                    <p className="text-sm font-semibold">Only Admin's</p>
                    <p className="text-xs text-gray-500">
                      Only admins can manage everything.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 3 */}
              <div
                className={`cursor-pointer border rounded-lg p-4 flex items-center justify-between ${
                  selectedOption === "specific"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedOption("specific");
                  setFieldValue("manage", "specific");
                }}
              >
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-lg" />
                  <div>
                    <p className="text-sm font-semibold">
                      Only to Specific people
                    </p>
                    <p className="text-xs text-gray-500">
                      Only some specific people can see it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Form>
              {/* Buttons */}
              <div className="flex items-center justify-between mt-4 lg:mt-8">
                <button
                  type="button"
                  className="text-sm text-gray-500 flex items-center hover:text-blue-500"
                  onClick={prevStep}
                >
                  <span className="mr-1">&lt;</span>
                  Back
                </button>

                {/* Next Button */}
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    disabled={!values.manage}
                    className={`${
                      values.manage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } px-7 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-center items-center ml-10">
            <StepIndicator step={step} />
            </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ManageProjects;