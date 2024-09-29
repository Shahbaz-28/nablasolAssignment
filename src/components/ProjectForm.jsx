import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema
const ProjectSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  client: Yup.string().required("Client is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
});

const ProjectForm = ({ nextStep, formData, updateFormData }) => {
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
    <div className="w-full max-w-md mx-auto mt-8 bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
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
        {({ setFieldValue }) => (
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
            <div className="flex justify-between space-x-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <Field
                  name="client"
                  as="select"
                  className="mt-1 w-[220px] px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                    className="text-red-600 text-sm "
                  />
                </div>
              </div>

              <h1 className="text-sm font-medium mt-9 text-gray-700">or</h1>
              <div className="flex flex-col">
                <Field
                  name="newClient"
                  placeholder="+ New Client"
                  className="mt-6 w-full px-3 py-2 border placeholder:text-sm shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
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
            <div className="flex space-x-2">
              {/* Start Date */}
              <div className="flex-1">
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
                    className="text-red-600 text-sm "
                  />
                </div>
              </div>
              {/* End Date */}
              <div className="flex-1">
                <Field
                  name="endDate"
                  type="date"
                  className="mt-6 block w-full px-3 py-2 border shadow-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
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
            <div className="flex items-center mt-8">
              <button
                type="button"
                className="text-sm text-gray-500 flex items-center hover:text-blue-500"
              >
                <span className="mr-1">&lt;</span>
                Back
              </button>

              <div className="ml-[120px]">
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

export default ProjectForm;
