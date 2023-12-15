import DetailLayout from '@/app/components/layout/detail';
import { getApiRoute, getPageRoute } from '@/constants';
import React from 'react';

const DepartmentDetailPage = ({
  params,
}: {
  params: { departmentIdx: string };
}) => {
  return (
    <DetailLayout
      endpoint={getApiRoute('DEPARTMENTS')}
      detailId={params.departmentIdx}
      editRoute={getPageRoute('DEPARTMENTS-EDIT').replace(
        ':departmentIdx',
        params.departmentIdx
      )}
      titleKey="departmentName"
    />
  );
};

export default DepartmentDetailPage;
