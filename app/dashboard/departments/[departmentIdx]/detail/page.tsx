import DetailLayout from '@/app/components/layout/detail';
import { getApiRoute } from '@/constants';
import React from 'react';

const DepartmentDetailPage = ({
  params,
}: {
  params: { departmentIdx: string };
}) => {
  return (
    <div>
      Department{params.departmentIdx}DetailPage
      <DetailLayout
        endpoint={getApiRoute('DEPARTMENTS')}
        detailId={params.departmentIdx}
      />
    </div>
  );
};

export default DepartmentDetailPage;
