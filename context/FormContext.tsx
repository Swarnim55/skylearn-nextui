import { useState, createContext, useContext, ReactNode } from 'react';

interface FormData {
  // Define the shape of your form data here
  [key: string]: any;
}

interface FormContextProps {
  data: FormData;
  setFormValues: (values: FormData) => void;
}

export const FormContext = createContext<FormContextProps | undefined>(
  undefined
);

interface FormProviderProps {
  children: ReactNode;
}

export default function FormProvider({ children }: FormProviderProps) {
  const [data, setData] = useState<FormData>({});

  const setFormValues = (values: FormData) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
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
