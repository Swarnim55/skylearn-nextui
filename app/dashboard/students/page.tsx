'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'name', label: 'Email', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];

const StudentsListPage = () => {
  return (
    <BaseListingView
      title="Students"
      endpoint={getApiRoute('STUDENTS')}
      tableSchema={tableSchema}
      initialVisibleColumns={['name', 'isActive']}
      filterKey="name"
    />
  );
};

export default StudentsListPage;
