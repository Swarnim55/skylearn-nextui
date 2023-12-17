import { useState, createContext, useContext, ReactNode } from 'react';

interface FormData {
  // Define the shape of your form data here
  [key: string]: any;
}

interface FormContextProps {
  data: FormData;
  setFormValues: (step: number, values: FormData) => void;
  submitForm: () => void;
}

export const FormContext = createContext<FormContextProps | undefined>(
  undefined
);

interface FormProviderProps {
  children: ReactNode;
  onSubmit: (data: FormData) => void;
}

export default function FormProvider({
  children,
  onSubmit,
}: FormProviderProps) {
  const [data, setData] = useState<FormData>({});

  const setFormValues = (step: number, values: FormData) => {
    console.log('step', step);
    console.log('values', values);
    setData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...values },
    }));
  };

  const submitForm = () => {
    const flattenedData = Object.values(data).reduce(
      (acc, stepData) => ({ ...acc, ...stepData }),
      {}
    );

    onSubmit(flattenedData);
  };

  return (
    <FormContext.Provider value={{ data, setFormValues, submitForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};
