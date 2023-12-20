'use-client';
import styles from '@/styles/styles.module.scss';
import { useForm } from 'react-hook-form';
import { useFormData } from '@/context/FormContext';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
// import { departments } from '@/app/dashboard/students/create/page';
import axios from 'axios';
import { PORTAL_BASE_URL, getApiRoute } from '@/constants';
import { useSession } from 'next-auth/react';
import { map } from 'lodash';
import { useEffect, useState } from 'react';

export default function AdmissionDetail({ formStep, nextFormStep }) {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};
  const { setFormValues } = useFormData();
  const [departments, setDepartments] = useState<unknown[]>([]);
  const [semester, setSemester] = useState<unknown[]>([]);
  const [courses, setCourses] = useState<unknown[]>([]);
  const fetchSelectOptions = async (endpoint, labelkey) => {
    console.log('endpoint', endpoint);
    console.log('labelkey', labelkey);
    try {
      const ep = `${PORTAL_BASE_URL}${endpoint}`;
      const response = await axios.get(ep, {
        headers: { Authorization: jwtToken },
      });
      const options = map(response.data.data, (item) => ({
        label: item[labelkey],
        value: item.pid,
        description: '',
      }));
      return options;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchDepartments = async () => {
    const options = await fetchSelectOptions(
      getApiRoute('DEPARTMENTS'),
      'departmentName'
    );
    return options;
  };
  const fetchSemseters = async () => {
    const options = await fetchSelectOptions(getApiRoute('SEMESTER'), 'name');
    return options;
  };
  const fetchCourses = async () => {
    const options = await fetchSelectOptions(getApiRoute('COURSES'), 'title');
    return options;
  };
  useEffect(() => {
    const fetchData = async () => {
      const departmentsData = await fetchDepartments();
      const semesterData = await fetchSemseters();
      const coursesData = await fetchCourses();
      setDepartments(departmentsData);
      setSemester(semesterData);
      setCourses(coursesData);
    };

    fetchData();
  }, [jwtToken]);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' });

  const onSubmit = (values) => {
    setFormValues(formStep, values);
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
          {/* <div className={styles.formRow}>
            <Autocomplete
              isRequired
              label="Select Department"
              defaultItems={departments}
              placeholder="Search a department"
              autoComplete="false"
              variant="bordered"
              {...register('DepartmentID', { required: true })}
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div> */}
          <div className={styles.formRow}>
            <Autocomplete
              isRequired
              label="Select Course"
              defaultItems={courses}
              placeholder="Search a course"
              autoComplete="false"
              variant="bordered"
              {...register('course', { required: true })}
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
              defaultItems={semester}
              placeholder="Search a semester"
              autoComplete="false"
              variant="bordered"
              {...register('SEMESTERID', { required: true })}
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
