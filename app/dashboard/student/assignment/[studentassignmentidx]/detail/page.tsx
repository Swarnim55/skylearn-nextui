'use client';
import { getApiRoute, getPageRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import { useRouter } from 'next/navigation';
import React from 'react';

const tableSchema = [
  { key: 'name', label: 'Email', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];

const StudentAssignmentListPage = () => {
  const router = useRouter();
  return (
    <BaseListingView
      title="Students"
      endpoint={getApiRoute('STUDENTS')}
      tableSchema={tableSchema}
      initialVisibleColumns={['name', 'isActive']}
      filterKey="name"
      handleCreate={() => router.push(getPageRoute('STUDENTS-CREATE'))}
      onActionClick={(action, id) => {}}
    />
  );
};

export default StudentAssignmentListPage;
