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

const StaffAssignmentPage = () => {
  return (
    <BaseListingView
      title="Assignments"
      endpoint={getApiRoute('ASSIGNMENT')}
      tableSchema={tableSchema}
      initialVisibleColumns={[
        'name',
        'marks',
        'isActive',
        'startDate',
        'endDate',
      ]}
      filterKey="name"
    />
  );
};

export default StaffAssignmentPage;

export default StaffAssignmentPage;
