'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Switch } from '@nextui-org/switch';
import { cn } from '@nextui-org/system';
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

type FormProps<T extends Record<string, unknown>> = {
  fieldSchema: Array<{
    key: string;
    type: 'text' | 'switch';
    required?: boolean;
    label: string;
    placeholder: string;
  }>;
  validationSchema: z.ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
};

function Form<T extends Record<string, unknown>>({
  fieldSchema,
  validationSchema,
  onSubmit,
}: FormProps<T>) {
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        {fieldSchema.map((field) => {
          const { key, label, placeholder, type, required } = field;
          switch (type) {
            case 'text':
              return (
                <div key={key} className="field-container">
                  <Input
                    {...register(key as Path<T>)}
                    required={required}
                    label={label}
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
            case 'switch':
              return (
                <Controller
                  control={control}
                  name={key as Path<T>}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      isSelected={!!value}
                      ref={ref}
                      onChange={onChange}
                      classNames={{
                        base: cn(
                          'inline-flex flex-row-reverse w-full my-8 max-w-md bg-content1 hover:bg-content2 items-center',
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
