'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'isVerified', label: 'Is Verified', type: 'switch' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];

const ContentListPage = () => {
  return (
    <BaseListingView
      title="Users"
      endpoint={getApiRoute('USER')}
      tableSchema={tableSchema}
      initialVisibleColumns={['firstName', 'email', 'isVerified', 'isActive']}
      filterKey="firstName"
    />
  );
};

export default ContentListPage;
