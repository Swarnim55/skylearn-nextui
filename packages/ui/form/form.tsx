'use client';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { z } from 'zod';
import './css/style.css';

import { PORTAL_BASE_URL } from '@/constants';
import { useMutation } from '@tanstack/react-query';

const axios = require('axios').default;
type FormProps<T extends Record<string, unknown>> = {
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
  onSubmit: SubmitHandler<T>;
};

function Form<T extends Record<string, unknown>>({
  endpoint,
  fieldSchema,
  validationSchema,
  onSubmit,
}: FormProps<T>) {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: fieldSchema.reduce(
      (acc, field) => ({ ...acc, [field.key]: '' }),
      {} as DefaultValues<T>
    ),
  });
  const postData = async (data: any) => {
    const response = await axios.post(`${PORTAL_BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: jwtToken,
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postData,
  });

  const formSubmit: SubmitHandler<any> = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col gap-1">
        {fieldSchema.map((field) => {
          const { key, label, placeholder, type, required } = field;
          switch (type) {
            case 'text':
              return (
                <div key={key} className="field-container">
                  <Input
                    {...register(key as Path<T>)}
                    label={label}
                    isRequired={required}
                    placeholder={placeholder ?? ''}
                    type="text"
                    className={errors[key as string] ? 'input-invalid' : ''}
                  />
                  {errors[key as string] && (
                    <span className="error-message">
                      {errors[key as string]?.message as ReactNode}
                    </span>
                  )}
                </div>
              );

            case 'textarea':
              return (
                <Controller
                  control={control}
                  name={key as Path<T>}
                  render={({ field: { onChange, value, ref } }) => (
                    <Textarea
                      {...register(key as Path<T>)}
                      label={label}
                      isRequired={required}
                      onChange={onChange}
                      value={value as string}
                      labelPlacement="inside"
                      placeholder={placeholder ?? 'Enter your description'}
                      className="max-w-full"
                      ref={ref}
                    />
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
