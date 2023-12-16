import styles from '@/styles/styles.module.scss';
import { useForm } from 'react-hook-form';
import { useFormData } from '@/context/FormContext';

export default function DocumentsUpload({
  formStep,
  nextFormStep,
  prevFormStep,
}) {
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
    <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
      <h2>Confirm Purchase</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formRow}>
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              {...register('checkbox', { required: true })}
            />
            Ready to buy?
          </label>
          {errors.checkbox && (
            <p className={styles.errorText}>Confirm purchase to proceed</p>
          )}
        </div>
        <button>Next</button>
      </form>
      <div className="flex justify-between ">
        <button
          type="submit"
          className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => prevFormStep()}
        >
          Prev Step: Admission Details
        </button>
        <button
          type="submit"
          className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => nextFormStep()}
        >
          Submit Form
        </button>
      </div>
    </div>
  );
}
