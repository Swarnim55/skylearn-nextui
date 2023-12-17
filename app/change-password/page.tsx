'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PORTAL_BASE_URL, getApiRoute } from '../../constants';
import axios from 'axios'
import { Button } from '@nextui-org/button';
import { strCompare } from '../../utils/string';
import { useSearchParams } from 'next/navigation';

const ChangePassword: React.FC = () => {
    const [newPassword,setNewPassword]=useState<string>('')
    const [confirmPassword,setConfirmPassword]=useState<string>('')
    const [isLoading,setisLoading]=useState<boolean>(false)
    const [error,setError]=useState<string>("")
    const searchParam=useSearchParams();
    const token=searchParam.get("token")

    const handleSubmit= async ()=>{

        if (newPassword.trim() === '' || confirmPassword.trim() === '') {
          setError('Password fields cannot be empty');
          return;
        }
        if(strCompare(newPassword,confirmPassword)==true)
        {
          try {
            setisLoading(true)
            var path = getApiRoute("CHANGE-PASSWORD");
            const requestData = { 
              "token":token,
              "password":newPassword,
              "confirmPassword":confirmPassword
             }; 
            const response = await axios({
              method: 'POST',
              url: `${PORTAL_BASE_URL}${path}`,
              data: requestData
            });
          if (response.status === 200) {
            setisLoading(false)
          } else {
            console.error('Unexpected response status:', response.status);
          }
          } catch (error) {
            setisLoading(false)
            console.error(error);
          }
        }
        else{
          setError("Password didnt match")
        }
        
    }

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required
                  className="block w-full rounded-md  py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required
                  className="block w-full rounded-md  py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='mt-2 text-red-800'>
                <label>{error}</label>
            </div>
            <div>
              <Button
                isLoading={isLoading}
                type="button"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change Password
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-500">
            Back To Sign In
            <Link
              href="../signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2"
            >
              Sign In!
            </Link>
          </p>
        </div>
      </div>
    )
}

export default ChangePassword