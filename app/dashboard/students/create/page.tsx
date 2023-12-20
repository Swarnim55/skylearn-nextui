'use client';
import FormCard from '@/app/components/forms/multi-step/FormCard';
import React, { useState } from 'react';
import {
  AdmissionDetail,
  DocumentsUpload,
  PersonalDetail,
} from '@/app/components/forms/multi-step/student-forms';
import FormCompleted from '@/app/components/forms/multi-step/Completed';
import FormProvider, { useFormData } from '@/context/FormContext';
import { PORTAL_BASE_URL, getApiRoute } from '@/constants';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const StudentTestCreate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};
  const { submitForm } = useFormData();
  const nextFormStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevFormStep = () => setCurrentStep((prevStep) => prevStep - 1);

  // Handle the submitted data, e.g., send it to the server
  const handleFormSubmit = async (data) => {
    try {
      // Set your API endpoint
      const apiUrl = PORTAL_BASE_URL + getApiRoute('STUDENTS');

      // Get the authorization token (replace 'your-token' with your actual token)
      const token = 'your-token';

      // Use Axios to send a POST request with the data and authorization header
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: jwtToken,
          'Content-Type': 'application/json', // Adjust content type as needed
        },
      });

      // Handle the response as needed (e.g., show a success message)
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };

  return (
    <FormProvider onSubmit={handleFormSubmit}>
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
            nextFormStep={submitForm}
          />
        )}
        {currentStep === 4 && <FormCompleted />}
      </FormCard>
    </FormProvider>
  );
};

export default StudentTestCreate;
