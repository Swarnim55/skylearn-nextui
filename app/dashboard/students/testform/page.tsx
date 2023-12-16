'use client';
import FormCard from '@/app/components/forms/multi-step/FormCard';
import React, { useState } from 'react';
import {
  AdmissionDetail,
  DocumentsUpload,
  PersonalDetail,
} from '@/app/components/forms/multi-step/student-forms';
import FormCompleted from '@/app/components/forms/multi-step/Completed';

const StudentTestCreate = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextFormStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevFormStep = () => setCurrentStep((prevStep) => prevStep - 1);
  return (
    <FormCard
      currentStep={currentStep}
      prevFormStep={prevFormStep}
      nextFormStep={nextFormStep}
    >
      {currentStep === 1 && (
        <AdmissionDetail formStep={1} nextFormStep={nextFormStep} />
      )}
      {currentStep === 2 && (
        <PersonalDetail
          formStep={2}
          prevFormStep={prevFormStep}
          nextFormStep={nextFormStep}
        />
      )}
      {currentStep === 3 && (
        <DocumentsUpload
          formStep={3}
          prevFormStep={prevFormStep}
          nextFormStep={nextFormStep}
        />
      )}
      {currentStep === 4 && <FormCompleted />}
    </FormCard>
  );
};

export default StudentTestCreate;
