'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import React from 'react';

const tableSchema = [
  { key: 'title', label: 'Assignment Title', type: 'text' },
  { key: 'summary', label: 'Summary', type: 'text' },
  { key: 'isActive', label: 'Publish', type: 'switch' },
];

const ContentListPage = () => {
  return (
    <BaseListingView
      title="Content"
      endpoint={getApiRoute('CONTENT')}
      tableSchema={tableSchema}
      initialVisibleColumns={['title', 'summary', 'isActive']}
      filterKey="title"
    />
  );
};

export default ContentListPage;
