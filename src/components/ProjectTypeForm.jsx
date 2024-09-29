import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema
const ProjectTypeSchema = Yup.object().shape({
  hourlyRate: Yup.string().required("Project hourly rate is required"),
  hoursPerPerson: Yup.string()
    .required("Hours per person is required")
    .oneOf(["1", "2", "3", "4"], "Select a valid number of hours"),
  resetBudget: Yup.boolean(),
  emailAlert: Yup.boolean(),
});

const ProjectTypeForm = ({ prevStep, nextStep, formData, updateFormData }) => {
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (JSON.stringify(parsedData.projectType) !== JSON.stringify(formData)) {
        updateFormData(parsedData.projectType || {});
      }
    }
  }, [formData, updateFormData]);

  return (
    <div className="max-w-lg w-full mx-auto h-screen lg:h-auto bg-white lg:mt-8 shadow-lg p-6 md:p-5 rounded-lg sm:max-w-md md:max-w-lg lg:max-w-md">
      <div className="flex justify-end">
        <button className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      <h2 className="text-lg font-semibold text-center mb-1">Project type</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Don’t panic — You can also customize this type in settings
      </p>

      <Formik
        initialValues={{
          type: "Time & Materials",
          hourlyRate: formData.hourlyRate || "",
          hoursPerPerson: formData.hoursPerPerson || "",
          budgetPercentage: 80,
          resetBudget: formData.resetBudget || false,
          emailAlert: formData.emailAlert || false,
        }}
        validationSchema={ProjectTypeSchema}
        onSubmit={(values) => {
          updateFormData({ projectType: values });
          localStorage.setItem(
            "formData",
            JSON.stringify({ projectType: values })
          );
          nextStep();
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="grid grid-cols-3 mb-4 border-gray-300">
              <button
                type="button"
                className={`py-2 text-center border rounded-l-md text-sm sm:text-xs ${
                  values.type === "Time & Materials"
                    ? "bg-blue-500 border-blue-500 text-white font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() =>
                  handleChange({
                    target: { name: "type", value: "Time & Materials" },
                  })
                }
              >
                Time & Materials
              </button>
              <button
                type="button"
                className={`py-2 text-center border text-sm sm:text-xs ${
                  values.type === "Fixed Fee"
                    ? "bg-blue-500 border-blue-500 text-white font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() =>
                  handleChange({ target: { name: "type", value: "Fixed Fee" } })
                }
              >
                Fixed Fee
              </button>
              <button
                type="button"
                className={`py-2 text-center border rounded-r-md text-sm sm:text-xs ${
                  values.type === "Non-Billable"
                    ? "bg-blue-500 border-blue-500 text-white font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() =>
                  handleChange({
                    target: { name: "type", value: "Non-Billable" },
                  })
                }
              >
                Non-Billable
              </button>
            </div>

            {/* Hourly Rate Input */}
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="hourlyRate"
                className="block text-sm font-medium text-gray-700"
              >
                Hourly
              </label>
              <p className="text-sm text-gray-500">
                We need hourly rate to track your project's billable amount.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Field
                  name="hourlyRate"
                  as="select"
                  className="mt-1 block w-full sm:w-[220px] px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                >
                  <option value="">Project Hourly Rate</option>
                  <option value="10000">₹ 10,000</option>
                  <option value="12000">₹ 12,000</option>
                  <option value="15000">₹ 15,000</option>
                </Field>
                <Field
                  name="d"
                  placeholder="₹"
                  type="text"
                  className="mt-1 block w-full sm:w-[100px] px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
                />
              </div>
              <div className=" h-[5px]">
                <ErrorMessage
                  name="hourlyRate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Hours Per Person Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="hoursPerPerson"
                className="block text-sm font-medium text-gray-700"
              >
                Budget
              </label>
              <p className="text-sm text-gray-500">
                We need hourly rate to track your project's billable amount.
              </p>
              <Field
                name="hoursPerPerson"
                as="select"
                className="mt-1 block w-full sm:w-[220px] px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 sm:text-sm"
              >
                <option value="">Select Hours</option>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
              </Field>
              <div className=" h-[5px]">
                <ErrorMessage
                  name="hoursPerPerson"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Budget Resets */}
            <div className="flex items-center mb-2">
              <Field
                type="checkbox"
                name="resetBudget"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="resetBudget"
                className="ml-2 block text-sm text-gray-900"
              >
                Budget resets every month
              </label>
            </div>

            {/* Email Alert */}
            <div className="flex items-center mb-2">
              <Field
                type="checkbox"
                name="emailAlert"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="emailAlert"
                className="ml-2 block text-sm text-gray-900"
              >
                Send email if project exceeds{" "}
                <span className="border py-1 px-2 rounded-md">80.00</span> % of
                budget
              </label>
            </div>
            {/* Submit Button */}
            <div className="flex items-center mt-8 justify-between">
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-blue-500"
                onClick={prevStep}
              >
                <span className="mr-1">&lt;</span>
                Back
              </button>
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-7 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectTypeForm;
