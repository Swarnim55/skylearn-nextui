'use client';
import React, { useEffect } from 'react';
import Form from './form'; // Update the path accordingly
import { useQuery } from '@tanstack/react-query';
import { FormProps } from 'react-hook-form';
import { PORTAL_BASE_URL } from '@/constants';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

type UpdateFormProps<T extends Record<string, unknown>> = FormProps<T> & {
  endpoint: string;
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
  editId: string;
  listRoute: string;
};

const UpdateForm = <T extends Record<string, unknown>>({
  endpoint,
  editId,
  fieldSchema,
  validationSchema,
  listRoute,
}: UpdateFormProps<T>) => {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};
  const { data: formData, isError } = useQuery({
    queryKey: ['lists', endpoint, jwtToken, editId],
    queryFn: async () => {
      const response = await fetch(`${PORTAL_BASE_URL}${endpoint}/${editId}`, {
        method: 'GET',
        headers: {
          Authorization: jwtToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    // ⬇️ disabled as long as the jwtToken is empty
    enabled: !!jwtToken,
  });

  const defaultValues = formData || {}; // Use fetched data as default values

  useEffect(() => {
    // Optionally handle error scenarios
    if (isError) {
      // Handle error
    }
  }, [isError]);

  if (!formData) {
    return <div>Loading...</div>; // You can render a loader or handle loading state
  }

  const onSubmit = async (data: T) => {
    // Perform PUT request to update data
    // Use axios or your preferred HTTP library
    await axios.put(`${PORTAL_BASE_URL}${endpoint}/${editId}`, data, {
      headers: {
        Authorization: jwtToken,
      },
    });
    // Optionally handle success or error
  };

  return (
    <Form
      endpoint={`${endpoint}/${editId}`}
      fieldSchema={fieldSchema}
      validationSchema={validationSchema as z.ZodSchema<T>}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      listRoute={listRoute}
    />
  );
};

export default UpdateForm;
