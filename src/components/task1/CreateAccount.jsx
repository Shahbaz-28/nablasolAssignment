import React from "react";
import { Formik, Form, Field } from "formik";

function CreateAccount() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center">1</div>
            <span className="font-medium text-gray-700">Your Profile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center">2</div>
            <span className="font-medium text-gray-700">Business Information</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">3</div>
            <span className="font-medium text-gray-400">Additional Users</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Business Information</h2>
        <p className="text-sm text-gray-500 mb-6">Please, enter information about your company.</p>

        {/* Form */}
        <Formik
          initialValues={{
            brandName: "",
            brandType: "",
            streetAddress: "",
            city: "",
            zipCode: "",
            taxID: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">Brand Name*</label>
                  <Field
                    name="brandName"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Input Your Brand Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Brand Type*</label>
                  <Field
                    as="select"
                    name="brandType"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>
                      Select Type of Your Brand
                    </option>
                    <option value="local">Local</option>
                    <option value="national">National</option>
                  </Field>
                  <div className="text-xs text-gray-500 mt-2">
                    Local: Brands with distribution in 3 divisions or less OR
                    multiple divisions but a total of 150 stores or less.
                    National: Brands with distribution in 4 or more divisions
                    or in more than 150 stores.
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Street Address*</label>
                  <Field
                    name="streetAddress"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Input Your Street Address"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">City*</label>
                  <Field
                    name="city"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Input City"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Zip Code*</label>
                  <Field
                    name="zipCode"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Input Zip Code"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Tax ID Number*</label>
                  <Field
                    name="taxID"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Input Tax ID Number"
                  />
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-8">
                <label className="block text-gray-600 mb-2">Documents</label>

                <div className="flex items-center justify-between mb-4">
                  <span>Electronically sign the agreement(s)</span>
                  <span className="text-green-500 text-2xl">✔️</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Non adult beverage Kroger market supplier waiver and release</span>
                  <span className="text-red-500 text-2xl">❌</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isSubmitting}
                >
                  Next Step
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateAccount;
