'use-client';
import styles from '@/styles/styles.module.scss';
import { useForm } from 'react-hook-form';
import { useFormData } from '@/context/FormContext';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { departments } from '@/app/dashboard/students/create/page';

export default function AdmissionDetail({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' });

  const onSubmit = (values) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <h3 className="mb-4 text-2xl font-semibold font-medium leading-none text-gray-900 dark:text-white">
        Student Details
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className={styles.formRow}>
            <Input
              type="text"
              id="rollNo"
              placeholder="Enter Roll Number"
              isRequired
              label="Roll Number"
              variant="bordered"
              {...register('rollNo', { required: true })}
            />
            {errors.rollNo && (
              <p className={styles.errorText}>Roll Number is required</p>
            )}
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="registrationNumber"
              placeholder="Enter Registration Number"
              isRequired
              label="Registration Number"
              variant="bordered"
              {...register('registrationNumber', { required: true })}
            />
            {errors.registrationNumber && (
              <p className={styles.errorText}>
                Registration Number is required
              </p>
            )}
          </div>
          <div className={styles.formRow}>
            <Input
              type="date"
              id="enrolledDate"
              isRequired
              label="Enrolled Date"
              variant="bordered"
              disableAnimation
              placeholder="date"
              {...register('enrolledDate', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Autocomplete
              isRequired
              label="Select Department"
              defaultItems={departments}
              placeholder="Search a department"
              autoComplete="false"
              variant="bordered"
              {...register('department', { required: true })}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className={styles.formRow}>
            <Autocomplete
              isRequired
              label="Select Semester"
              defaultItems={departments}
              placeholder="Search a semester"
              autoComplete="false"
              variant="bordered"
              {...register('semester', { required: true })}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next Step: Personal Information
          </button>
        </div>
      </form>
    </div>
  );
}
