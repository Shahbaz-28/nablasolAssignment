import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

const MasterCreateAccount = () => {
  const [step, setStep] = useState(1);
  const [submitForm, setSubmitForm] = useState(() => () => {});
  const [formData, setFormData] = useState({
    stepp1: {},
    stepp2: {},
  });

  const nextStep = () => {
    submitForm();
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("accountData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("accountData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData((prevData) => {
      const isDataDifferent =
        JSON.stringify(prevData) !==
        JSON.stringify({ ...prevData, ...newData });

      if (isDataDifferent) {
        return {
          ...prevData,
          ...newData,
        };
      } else {
        return prevData;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-400 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-3xl mt-4">
        {step === 1 && (
          <Step1
            setSubmitStep1={setSubmitForm}
            onNext={() => setStep(2)}
            formData={formData.stepp1}
            updateFormData={updateFormData}
            step={step}
          />
        )}
        {step === 2 && (
          <Step2
            setSubmitStep1={setSubmitForm}
            formData={formData.stepp2}
            updateFormData={updateFormData}
            onNext={() => {}}
            step={step}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center py-2 mt-2 w-full max-w-3xl md:px-0">
        <div>
        <button
          type="button"
          className="text-sm flex items-center hover:text-white"
          onClick={prevStep}
        >
          <span className="mr-1">&lt;</span>
          Back to Login
        </button>
        </div>
        <div className=" space-x-2 lg:space-x-4">
          {step === 2 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-white  text-[#7D89EC]  px-6 py-1 border-1 hover:bg-gray-200 border-[#7D89EC] transition duration-200 ease-in-ou  rounded-lg shadow-md"
            >
              <span className="mr-1">&lt;</span>
              Previous Step
            </button>
          )}
          <button
            type="button"
            onClick={nextStep}
            className="bg-[#7D89EC] hover:bg-[#3856b8] transition duration-200 ease-in-out text-white px-6 py-1 rounded-lg shadow-md"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterCreateAccount;
