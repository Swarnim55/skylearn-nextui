'use client';

import UpdateForm from '@/packages/ui/form/UpdateForm';
import { z } from 'zod';

const EditLayout = ({
  endpoint,
  editId,
  listRoute,
  titleKey,
  fieldSchema,
  validationSchema,
}: {
  endpoint: string;
  editId: string;
  listRoute: string;
  titleKey: string;
  fieldSchema: Array<{
    key: string;
    type:
      | 'text'
      | 'switch'
      | 'number'
      | 'email'
      | 'password'
      | 'textarea'
      | 'select';
    required?: boolean;
    label: string;
    placeholder?: string;
  }>;
  validationSchema: unknown;
}) => {
  return (
    <div>
      EditLayout
      <UpdateForm
        endpoint={endpoint}
        editId={editId}
        fieldSchema={fieldSchema}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default EditLayout;
