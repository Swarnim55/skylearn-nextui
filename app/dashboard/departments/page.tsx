'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'departmentName', label: 'Department Name', type: 'text' },
  { key: 'type', label: 'Type', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];
const DepartmentListPage = () => {
  return (
    <BaseListingView
      title="Departments"
      endpoint={getApiRoute('DEPARTMENTS')}
      tableSchema={tableSchema}
      initialVisibleColumns={['departmentName', 'type', 'isActive']}
      filterKey="departmentName"
    />
  );
};

export default DepartmentListPage;
