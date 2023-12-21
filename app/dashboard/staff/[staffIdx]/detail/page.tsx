import DetailLayout from '@/app/components/layout/detail';
import { getApiRoute, getPageRoute } from '@/constants';
import React from 'react';

const StaffDetailPage = ({
  params,
}: {
  params: { staffIdx: string };
}) => {
  return (
    <DetailLayout
      endpoint={getApiRoute('STAFF')}
      detailId={params.staffIdx}
      editRoute={getPageRoute('STAFF-EDIT').replace(
        ':staffIdx',
        params.staffIdx
      )}
      titleKey="Staff"
    />
  );
};

export default StaffDetailPage;
