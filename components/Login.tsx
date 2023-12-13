'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { ThemeSwitch } from '@/components/theme-switch';
import { useTheme } from 'next-themes';
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Signin Page | Next.js E-commerce Dashboard Template",
//   description: "This is Signin page for TailAdmin Next.js",
//   // other metadata
// };

export const LoginPage = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn('credentials', {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: 'http://localhost:3000',
    });
  };
  return (
    <div
      className={`flex min-h-full flex-col  justify-center px-6 py-12 lg:px-8 ${
        theme === 'dark' ? 'text-white-900' : 'text-gray-900'
      } `}
    >
      <div>
        <ThemeSwitch className="absolute top-5 right-5" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium leading-6`}
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => (emailRef.current = e.target.value)}
                placeholder="Enter your email or phone number..."
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 "
              >
                Password
              </label>
              <div className="text-sm">
                <Link href="../reset-password">Forgot password?</Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                onChange={(e) => (passwordRef.current = e.target.value)}
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member Yet?
          <Link
            href="../signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2"
          >
            Register Now !
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
