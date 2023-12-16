'use client';
import { useFormData } from '@/context/FormContext';

export default function FormCompleted() {
  const { data } = useFormData();

  return (
    <>
      <h2>Submission Successfull 🎉</h2>

      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
