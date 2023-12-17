'use-client';
import styles from '@/styles/styles.module.scss';
import { useForm } from 'react-hook-form';
import { useFormData } from '@/context/FormContext';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

export default function PersonalDetail({
  formStep,
  prevFormStep,
  nextFormStep,
}) {
  const { setFormValues } = useFormData();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' });

  const onSubmit = (values) => {
    console.log('stepinp', formStep);

    console.log('valsinp', values);
    setFormValues(formStep, values);
    nextFormStep();
  };

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <h3 className="mb-4 text-2xl font-semibold font-medium leading-none text-gray-900 dark:text-white">
        Student Personal Details
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 sm:grid-cols-3">
          <div className={styles.formRow}>
            <Input
              type="text"
              id="firstName"
              placeholder="Student First Name"
              isRequired
              label="First Name"
              variant="bordered"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <p className={styles.errorText}>First Name is required</p>
            )}
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="middleName"
              placeholder="Student Middle Name"
              label="Middle Name"
              variant="bordered"
              {...register('middleName', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="lastName"
              placeholder="Student Last Name"
              isRequired
              label="Last Name"
              variant="bordered"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <p className={styles.errorText}>Last Name is required</p>
            )}
          </div>
          <div className={styles.formRow}>
            <Input
              type="date"
              id="dob"
              isRequired
              label="Date of Birth (DOB)"
              variant="bordered"
              disableAnimation
              placeholder="Date of birth"
              {...register('dob', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Autocomplete
              isRequired
              label="Select Gender"
              defaultItems={[
                { label: 'Male', value: 'Male', description: '' },
                { label: 'Female', value: 'Female', description: '' },
              ]}
              placeholder="Search a gender"
              autoComplete="false"
              variant="bordered"
              {...register('gender', { required: true })}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className={styles.formRow}>
            <Input
              type="email"
              id="email"
              isRequired
              label="Email"
              variant="bordered"
              placeholder="Enter Student Email"
              {...register('email', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="fatherName"
              placeholder="Student Father Name"
              label="Father Name"
              variant="bordered"
              {...register('fatherName', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="number"
              id="fatherMobile"
              placeholder="Student Father Mobile No."
              label="Father Mobile"
              variant="bordered"
              {...register('fatherMobile', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="motherName"
              placeholder="Student Mother Name"
              label="Mother Name"
              variant="bordered"
              {...register('motherName', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="number"
              id="motherMobile"
              placeholder="Student Mother Mobile No."
              label="Mother Mobile"
              variant="bordered"
              {...register('motherMobile', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="text"
              id="address"
              placeholder="Student Address"
              isRequired
              label="Student Address"
              variant="bordered"
              {...register('address', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="number"
              id="phone"
              isRequired
              placeholder="Student Mobile No."
              label="Student Mobile"
              variant="bordered"
              {...register('phone', { required: true })}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type="email"
              id="parentEmail"
              isRequired
              label="Email"
              variant="bordered"
              placeholder="Enter Parent Email"
              {...register('parentEmail', { required: true })}
            />
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            type="button"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => prevFormStep()}
          >
            Prev Step: Admission Details
          </button>
          <button
            type="submit"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            // onClick={() => nextFormStep()}
          >
            Next Step: Documents Upload
          </button>
        </div>
      </form>
    </div>
  );
}
