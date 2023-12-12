'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'title', label: 'Assignment Title', type: 'text' },
  { key: 'details', label: 'Details', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];

const CoursesListPage = () => {
  return (
    <BaseListingView
      title="COURSES"
      endpoint={getApiRoute('COURSES')}
      tableSchema={tableSchema}
      initialVisibleColumns={['title', 'details', 'isActive']}
      filterKey="title"
    />
  );
};

export default CoursesListPage;
