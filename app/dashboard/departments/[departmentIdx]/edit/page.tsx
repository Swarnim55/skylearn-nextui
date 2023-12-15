'use client';
import EditLayout from '@/app/components/layout/edit';
import { getApiRoute, getPageRoute } from '@/constants';
import React from 'react';
import { z } from 'zod';

const EditDepartmentFieldSchema = [
  {
    key: 'departmentName',
    label: 'Department Name',
    placeholder: 'Enter Department Name',
    type: 'text',
    required: true,
  },
  {
    key: 'type',
    label: 'Type',
    placeholder: 'Enter Type',
    type: 'text',
    required: true,
  },
  {
    key: 'descriptions',
    label: 'Description',
    placeholder: 'Description for the Department',
    type: 'textarea',
    required: true,
  },
  {
    key: 'isActive',
    label: 'Publish',
    type: 'switch',
    placeholder: 'Publish this Department!',
  },
];
const validationSchema = z.object({
  departmentName: z
    .string()
    .min(3, 'Provide atleast 3 Characters!')
    .max(50, 'Too Long!'),
  descriptions: z.string(),
  type: z.string().min(3, 'Provide atleast 3 Characters!').max(50, 'Too Long!'),
  isActive: z.boolean(),
});
const DepartmentEditPage = ({
  params,
}: {
  params: { departmentIdx: string };
}) => {
  return (
    <div>
      DepartmentEditPage
      <EditLayout
        editId={params.departmentIdx}
        endpoint={getApiRoute('DEPARTMENTS')}
        fieldSchema={[
          {
            key: 'departmentName',
            label: 'Department Name',
            placeholder: 'Enter Department Name',
            type: 'text',
            required: true,
          },
          {
            key: 'type',
            label: 'Type',
            placeholder: 'Enter Type',
            type: 'text',
            required: true,
          },
          {
            key: 'descriptions',
            label: 'Description',
            placeholder: 'Description for the Department',
            type: 'textarea',
            required: true,
          },
          {
            key: 'isActive',
            label: 'Publish',
            type: 'switch',
            placeholder: 'Publish this Department!',
          },
        ]}
        titleKey="departmentName"
        validationSchema={validationSchema}
        listRoute={getPageRoute('DEPARTMENTS')}
      />
    </div>
  );
};

export default DepartmentEditPage;
