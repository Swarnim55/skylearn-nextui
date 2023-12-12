'use client';
import { getApiRoute } from '@/constants';
import BaseListingView from '@/packages/base/BaseListingView';
import Form from '@/packages/ui/form/form';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
  cn,
} from '@nextui-org/react';
import React, { useRef } from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { z } from 'zod';

const CreateDepartmentDTO = [
  {
    key: 'departmentName',
    label: 'Department Name',
    placeholder: 'Enter Department Name',
    type: 'text',
    required: true,
  },
  {
    key: 'type',
    label: 'Type',
    placeholder: 'Enter Type',
    type: 'text',
    required: true,
  },
  {
    key: 'isActive',
    label: 'Publish',
    type: 'switch',
    placeholder: 'Publish this Department!',
  },
];

const tableSchema = [
  { key: 'departmentName', label: 'Department Name', type: 'text' },
  { key: 'type', label: 'Type', type: 'text' },
  {
    key: 'isActive',
    label: 'Publish',
    type: 'switch',
  },
];
const validationSchema = z.object({
  departmentName: z
    .string()
    .min(3, 'Provide atleast 3 Characters!')
    .max(50, 'Too Long!'),
  type: z.string().min(3, 'Provide atleast 3 Characters!').max(50, 'Too Long!'),
  isActive: z.boolean(),
});
const DepartmentListPage = () => {
  const formRef = useRef();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleCreate = () => {
    onOpen();
  };

  return (
    <>
      <BaseListingView
        title="Departments"
        endpoint={getApiRoute('DEPARTMENTS')}
        tableSchema={tableSchema}
        initialVisibleColumns={['departmentName', 'type', 'isActive']}
        filterKey="departmentName"
        handleCreate={handleCreate}
      />
      {/* Render the modal here */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          backdrop="opaque"
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add A New Department
                </ModalHeader>
                <ModalBody>
                  <Form
                    fieldSchema={[
                      {
                        key: 'departmentName',
                        label: 'Department Name',
                        placeholder: 'Enter Department Name',
                        type: 'text',
                        required: true,
                      },
                      {
                        key: 'type',
                        label: 'Type',
                        placeholder: 'Enter Type',
                        type: 'text',
                        required: true,
                      },
                      {
                        key: 'isActive',
                        label: 'Publish',
                        type: 'switch',
                        placeholder: 'Publish this Department!',
                      },
                    ]}
                    onSubmit={(data) => console.log('data', data)}
                    validationSchema={validationSchema}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default DepartmentListPage;
