import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectTypeForm from "./ProjectTypeForm";
import SelectView from "./SelectView ";
import ManageProjects from "./ManageProjects";

const MasterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectDetails: {},
    projectType: {},
    selectedView: {},
    manageProjects: {},
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => {
    setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : 4));
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div>
      {step === 1 && (
        <ProjectForm
          nextStep={nextStep}
          formData={formData.projectDetails}
          updateFormData={updateFormData}
        />
      )}
      {step === 2 && (
        <ProjectTypeForm
          prevStep={prevStep}
          nextStep={nextStep}
          formData={formData.projectType}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <SelectView
          prevStep={prevStep}
          nextStep={nextStep}
          formData={formData.selectedView}
          updateFormData={updateFormData}
        />
      )}
      {step === 4 && (
        <ManageProjects
          prevStep={prevStep}
          formData={formData.manageProjects}
          updateFormData={updateFormData}
        />
      )}
    </div>
  );
};

export default MasterForm;
