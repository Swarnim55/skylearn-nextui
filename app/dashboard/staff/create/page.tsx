'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ReactDOM } from 'react';
import { z } from 'zod';
import { PORTAL_BASE_URL, getApiRoute } from '../../../../constants';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { apiRoutes } from '@/constants/apiRoutes';
import { pageRoutes } from '@/constants/pageRoutes';
import { map } from 'lodash';
import { selectFieldDataFetcher } from '@/utils/fetch';

interface StaffFormDataType {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
  birthDate: string;
  joinDate: string;
  department: string;
  position: string;
}

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const departments = [
  { Pid: 'Technical departmentzzz', name: 'dep_b55c69a5a510' },
  { Pid: 'Civil Engineering', name: 'dep_1713679a2255' },
  { Pid: 'ECE', name: 'dep_42f6f517427e' },
];

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: sessionData } = useSession();
  const [deptOpt, setDeptOpt] = useState<string[]>([]);
  const { jwtToken } = sessionData?.user?.data || {};
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const resdata = await selectFieldDataFetcher(
        getApiRoute('DEPARTMENTS'),
        'departmentName',
        jwtToken
      );
      setDeptOpt(resdata);
    };

    fetchData();
  }, [jwtToken]);

  console.log('deptOpt', deptOpt);
  const onSubmit: SubmitHandler<StaffFormDataType> = async (data) => {
    try {
      var path = getApiRoute('STAFF');
      const response = await axios({
        method: 'POST',
        url: `${PORTAL_BASE_URL}${path}`,
        data: data,
        headers: {
          Authorization: jwtToken,
        },
      });
      if (response.status_code === 200) {
        router.push(pageRoutes.STAFF);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-4">
          <Input
            {...register('firstName')}
            isRequired
            type="text"
            label="First Name"
            placeholder="Enter your first name"
          />
          <Input
            {...register('middleName')}
            type="text"
            label="Middle Name"
            placeholder="Enter your middle name"
          />
          <Input
            {...register('lastName')}
            isRequired
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-4">
          <Input
            {...register('email')}
            isRequired
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            {...register('address')}
            isRequired
            type="address"
            label="Address"
            placeholder="Enter your address"
          />
          <Input
            {...register('phone')}
            isRequired
            type="text"
            label="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-4">
          <Select
            {...register('gender')}
            label="Select your gender"
            className="max-w-xs"
          >
            {genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register('dob')}
            isRequired
            type="date"
            label="Birth Date"
            placeholder="Enter date of birth"
          />
          <Input
            {...register('joiningDate')}
            isRequired
            type="date"
            label="Join Date"
            placeholder="Select join date"
          />
        </div>
        <div className="flex w-1/2 flex-wrap md:flex-nowrap gap-4 py-4">
          <Select
            {...register('departmentId')}
            label="Select Department"
            className="max-w-xs"
          >
            {deptOpt.map((dep) => (
              <SelectItem key={dep.value} value={dep.value}>
                {dep.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register('postion')}
            isRequired
            type="text"
            label="Position"
            placeholder="Enter Position"
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-4">
          <Button type="submit" size="lg" color="primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
