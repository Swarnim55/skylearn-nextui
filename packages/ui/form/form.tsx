'use client';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Switch } from '@nextui-org/switch';
import { cn } from '@nextui-org/system';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import {
  Controller,
  DefaultValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import './css/style.css';

import { PORTAL_BASE_URL } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const axios = require('axios').default;
export type FormProps<T extends Record<string, unknown>> = {
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
  endpoint: string;
  validationSchema: z.ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  listRoute?: string;
};

function Form<T extends Record<string, unknown>>({
  endpoint,
  fieldSchema,
  validationSchema,
  onSubmit,
  listRoute,
  defaultValues,
}: FormProps<T>) {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    // resolver: zodResolver(validationSchema),
    defaultValues: defaultValues?.data || {},
  });

  const postData = async (data: any) => {
    const response = await axios({
      method: 'PUT',
      url: `${PORTAL_BASE_URL}${endpoint}`,
      data: data,
      headers: {
        Authorization: jwtToken,
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postData,
  });

  const formSubmit: SubmitHandler<any> = async (data) => {
    try {
      // Call the mutation function
      await mutation.mutateAsync(data);

      // Show a success toast upon successful mutation
      toast.success('Mutation successful!');
      console.log('lr', listRoute);
      if (listRoute) {
        router.push(listRoute);
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Mutation error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col gap-1">
        {fieldSchema.map((field) => {
          const { key, label, placeholder, type, required } = field;
          const errorMessage = errors[key as string]?.message;
          switch (type) {
            case 'text':
              return (
                <Controller
                  control={control}
                  name={key as Path<T>}
                  render={({ field: { onChange, value, ref } }) => {
                    return (
                      <>
                        <Input
                          label={label}
                          onChange={onChange}
                          name={key as Path<T>}
                          value={value as string}
                          labelPlacement="inside"
                          ref={ref}
                          isRequired={required}
                          placeholder={placeholder ?? ''}
                          type="text"
                          className={
                            errors[key as string] ? 'input-invalid' : ''
                          }
                        />
                        {errors[key as string] && (
                          <span className="error-message">
                            {errorMessage as ReactNode}
                          </span>
                        )}
                      </>
                    );
                  }}
                />
              );

            case 'textarea':
              return (
                <Controller
                  control={control}
                  name={key as Path<T>}
                  render={({ field: { onChange, value, ref } }) => (
                    <>
                      <Textarea
                        label={label}
                        isRequired={required}
                        onChange={onChange}
                        value={value as string}
                        labelPlacement="inside"
                        placeholder={placeholder ?? 'Enter your description'}
                        className="max-w-full"
                        ref={ref}
                      />
                      {errors[key as string] && (
                        <span className="error-message">
                          {errorMessage as ReactNode}
                        </span>
                      )}
                    </>
                  )}
                />
              );
            case 'switch':
              return (
                <Controller
                  control={control}
                  name={key as Path<T>}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      classNames={{
                        base: cn(
                          'flex inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
                          'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                          'data-[selected=true]:border-primary'
                        ),
                        wrapper: 'p-0 h-4 overflow-visible',
                        thumb: cn(
                          'w-6 h-6 border-2 shadow-lg',
                          'group-data-[hover=true]:border-primary',
                          //selected
                          'group-data-[selected=true]:ml-6',
                          // pressed
                          'group-data-[pressed=true]:w-7',
                          'group-data-[selected]:group-data-[pressed]:ml-4'
                        ),
                      }}
                      isSelected={!!value}
                      ref={ref}
                      onChange={onChange}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-medium">{label}</p>
                        <p className="text-tiny text-default-400">
                          {placeholder}
                        </p>
                      </div>
                    </Switch>
                  )}
                />
              );
            case 'date':
              return(
                <Controller
                control={control}
                name={key as Path<T>}
                render={({ field: { onChange, value, ref } }) => {
                  return (
                    <>
                      <Input
                        label={label}
                        onChange={onChange}
                        name={key as Path<T>}
                        value={value as string}
                        labelPlacement="inside"
                        ref={ref}
                        isRequired={required}
                        placeholder={placeholder ?? ''}
                        type="date"
                        className={
                          errors[key as string] ? 'input-invalid' : ''
                        }
                      />
                      {errors[key as string] && (
                        <span className="error-message">
                          {errorMessage as ReactNode}
                        </span>
                      )}
                    </>
                  );
                }}
              />
              )
            default:
              return null;
          }
        })}
        <Button type="submit" color="primary" variant="ghost">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default Form;
