'use client';
import { getApiRoute, getPageRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import { useRouter } from 'next/navigation';
import React from 'react';

const tableSchema = [
  { key: 'assignmentName', label: 'AssignmentName', type: 'text' },
  { key: 'semester', label: 'Semester', type: 'text' },
  { key: 'departmentName', label: 'DepartmentName', type: 'text' },
  { key: 'startDate', label: 'StartDate', type: 'text' },
  { key: 'endDate', label: 'EndDate', type: 'text' },
  { key: 'studentName', label: 'StudentName', type: 'text' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'assignedOn', label: 'AssignedOn', type: 'text' }
];

const StaffStudentAssignmentDetailPage = () => {
  const router = useRouter();
  return (
    <><div>
      <h3>CARDS</h3>
    </div>
    <div>
        <BaseListingView
          title="Recent Assignments"
          endpoint={getApiRoute('STUDENT-ASSIGNMENT')}
          tableSchema={tableSchema}
          initialVisibleColumns={['AssignmentName', 'Semester','DepartmentName','StartDate','EndDate','StudentName','Status','AssignedOn']}
          filterKey="AssignmentName"
          handleCreate={() => router.push(getPageRoute('STUDENTS-CREATE'))}
          onActionClick={(action, id) => { } } />
      </div></>
  );
};

export default StaffStudentAssignmentDetailPage;
