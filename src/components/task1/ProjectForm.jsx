import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import StepIndicator from "./StepIndicator";

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  client: Yup.string().required("Client is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
});

const ProjectForm = ({ nextStep, formData, updateFormData, step }) => {
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (
        JSON.stringify(parsedData.projectDetails) !== JSON.stringify(formData)
      ) {
        updateFormData(parsedData.projectDetails || {});
      }
    }
  }, [formData, updateFormData]);

  return (
    <div className="w-full max-w-md h-screen lg:h-auto  md:max-w-md mx-auto mt-0 lg:mt-8 bg-white p-6 md:p-5 shadow-lg rounded-lg">
      <div className="flex justify-end ">
        <button className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-2">
        Create a Project
      </h2>

      <Formik
        initialValues={{
          projectName: formData.projectName || "",
          client: formData.client || "",
          startDate: formData.startDate || "",
          endDate: formData.endDate || "",
          notes: formData.notes || "",
          newClient: formData.newClient || "",
        }}
        validationSchema={ProjectSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          updateFormData({ projectDetails: values });
          localStorage.setItem(
            "formData",
            JSON.stringify({ projectDetails: values })
          );
          nextStep();
          setSubmitting(false);
        }}
      >
        <Form className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <Field
              name="projectName"
              placeholder="Enter project name here"
              className="mt-1 block w-full px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <div className="h-[5px]">
              <ErrorMessage
                name="projectName"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
          </div>

          {/* Client */}
          <div className="flex flex-col md:flex-row md:space-x-3">
            <div className="md:flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Client
              </label>
              <Field
                name="client"
                as="select"
                className="mt-1 block w-full lg:w-[240px] px-3  py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select a client</option>
                <option value="Client1">Client 1</option>
                <option value="Client2">Client 2</option>
                <option value="New">New Client</option>
              </Field>
              <div className="h-[5px]">
                <ErrorMessage
                  name="client"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-center items-center mt-4 md:mt-0">
              <h1 className="text-sm font-medium lg:mt-4 mb-2 lg:mb-0 text-gray-700">
                or
              </h1>
            </div>

            <div className="md:flex-1">
              <Field
                name="newClient"
                placeholder="+ New Client"
                className="mt-0 lg:mt-6 block w-full placeholder:text-sm px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <div className="h-[5px]">
                <ErrorMessage
                  name="newClient"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="md:flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Dates
              </label>
              <Field
                name="startDate"
                type="date"
                className="mt-1 block w-full px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <div className="h-[5px]">
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="md:flex-1 mt-4 md:mt-0">
              <Field
                name="endDate"
                type="date"
                className="mt- lg:mt-6 block w-full px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <div className="h-[5px]">
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <Field
              name="notes"
              as="textarea"
              placeholder="Optional"
              className="mt-1 block w-full px-3 py-4 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-blue-500"
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
          <div className="flex justify-center items-center ml-10">
            <StepIndicator step={step} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProjectForm;
