'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'name', label: 'Assignment Name', type: 'text' },
  { key: 'marks', label: 'Marks', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
  { key: 'startDate', label: 'Start Date', type: 'date' },
  { key: 'endDate', label: 'End Date', type: 'date' },
];

const DepartmentListPage = () => {
  return (
    <BaseListingView
      title="Department"
      endpoint={getApiRoute('DEPARTMENTS')}
      tableSchema={tableSchema}
      initialVisibleColumns={['name', 'isActive', 'Marks']}
    />
  );
};

export default DepartmentListPage;
