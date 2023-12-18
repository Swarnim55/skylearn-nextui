'use client';
import EditLayout from '@/app/components/layout/edit';
import { getApiRoute, getPageRoute } from '@/constants';
import React from 'react';
import { z } from 'zod';

const EditStaffFieldSchema = [
  {
    key: 'firstName',
    label: 'First Name',
    placeholder: 'Enter First Name',
    type: 'text',
    required: true,
  },
  {
    key: 'middleName',
    label: 'Middle Name',
    placeholder: 'Enter Middle Name',
    type: 'text',
    required: true,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last Name',
    type: 'text',
    required: true,
  },
  {
    key: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    type: 'text',
    required: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    placeholder: 'Select Gender',
    type: 'select',
    required: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    placeholder: 'Select Your Number',
    type: 'select',
    required: true,
  },
  {
    key: 'joiningDate',
    label: 'Join Date',
    placeholder: 'Select Join Date',
    type: 'date',
    required: true,
  },
  {
    key: 'dob',
    label: 'Birth Date',
    placeholder: 'Select Birth Date',
    type: 'date',
    required: true,
  },
  {
    key: 'isActive',
    label: 'Publish',
    type: 'switch',
    placeholder: 'Activate this staff!',
  },
];
const validationSchema = z.object({
    firstName: z
    .string()
    .min(3, 'Provide atleast 3 Characters!')
    .max(50, 'Too Long!'),
    lastName: z.string().min(3, 'Provide atleast 3 Characters!').max(50, 'Too Long!'),
    email: z.string().min(3, 'Provide atleast 3 Characters!').max(50, 'Too Long!'),
    isActive: z.boolean(),
});
const StaffEditPage = ({
  params,
}: {
  params: { staffIdx: string };
}) => {
  return (
    <div>
      StaffEditPage
      <EditLayout
        editId={params.staffIdx}
        endpoint={getApiRoute('STAFF')}
        fieldSchema={EditStaffFieldSchema}
        titleKey="staffName"
        validationSchema={validationSchema}
        listRoute={getPageRoute('STAFF')}
      />
    </div>
  );
};

export default StaffEditPage;
