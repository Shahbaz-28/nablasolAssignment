import React, { useState } from "react";
import { Formik, Form } from "formik";
import { AiOutlineUnorderedList, AiOutlineAppstore } from "react-icons/ai";
import StepIndicator from "./StepIndicator";

const SelectView = ({ prevStep, nextStep, formData, updateFormData, step }) => {
  const [selectedView, setSelectedView] = useState("");

  return (
    <Formik
      initialValues={{ view: "" }}
      onSubmit={(values) => {
        console.log("Form submitted with view:", values.view);
        updateFormData({ selectedView: values.view });
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...formData, selectedView: values.view })
        );
        nextStep();
      }}
    >
      {({ setFieldValue, values }) => (
        <div className="flex justify-center min-h-[540px] h-screen lg:h-auto">
          <div className="bg-white w-full sm:w-[400px] md:w-[450px] h-auto sm:mt-12 md:mt-8 lg:mt-8 sm:h-auto rounded-xl shadow-lg p-6 md:p-5">
            <div className="flex justify-end">
              <button className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <h2 className="text-xl font-semibold text-center mb-2">
              Select a view
            </h2>

            <p className="text-sm text-gray-500 text-center mb-6">
              You can also customize this view in settings
            </p>

            {/* View options */}
            <div className="flex justify-center space-x-4 sm:space-x-8 mb-6">
              {/* First option (List) */}
              <div
                className={`text-center cursor-pointer ${
                  selectedView === "list" ? "border-blue-500" : ""
                }`}
                onClick={() => {
                  setSelectedView("list");
                  setFieldValue("view", "list");
                }}
              >
                <div
                  className={`w-[140px] sm:w-[170px] h-[90px] sm:h-[120px] ${
                    selectedView === "list"
                      ? "border-2 border-blue-500"
                      : "border-2 border-gray-100"
                  } rounded-lg mb-2 flex items-center justify-center`}
                >
                  <AiOutlineUnorderedList
                    size={40}
                    className={
                      selectedView === "list"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }
                  />
                </div>
                <p className="text-sm text-gray-500">List</p>
              </div>

              {/* Second option (Board) */}
              <div
                className={`text-center cursor-pointer ${
                  selectedView === "board" ? "border-blue-500" : ""
                }`}
                onClick={() => {
                  setSelectedView("board");
                  setFieldValue("view", "board");
                }}
              >
                <div
                  className={`w-[140px] sm:w-[170px] h-[90px] sm:h-[120px] ${
                    selectedView === "board"
                      ? "border-2 border-blue-500"
                      : "border-2 border-gray-100"
                  } rounded-lg mb-2 flex items-center justify-center`}
                >
                  <AiOutlineAppstore
                    size={40}
                    className={
                      selectedView === "board"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }
                  />
                </div>
                <p className="text-sm text-gray-500">Board</p>
              </div>
            </div>

            <Form>
              {/* Buttons */}
              <div className="flex items-center justify-between mt-[60px] sm:mt-[140px]">
                <button
                  type="button"
                  className="text-sm  text-gray-500 flex items-center hover:text-blue-500"
                  onClick={prevStep}
                >
                  <span className="mr-1">&lt;</span>
                  Back
                </button>
                <div className="flex justify-center w-full mr-7">
                  <button
                    type="submit"
                    disabled={!values.view}
                    className={`${
                      values.view
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } px-7 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-center items-center ml-3">
                <StepIndicator step={step} />
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SelectView;
