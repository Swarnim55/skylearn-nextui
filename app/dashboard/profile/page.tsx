'use client';
import { Card, User } from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: sessionData } = useSession();

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-6 py-6 md:py-10 ">
      <aside className="w-full md:w-1/2">
        <Card className="w-full overflow-hidden shadow-lg">
          <div className="bg-slate-400 dark:bg-slate-500 text-black dark:text-white p-4">
            <h3 className="text-2xl">User Information</h3>
          </div>

          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="h-24 w-24 overflow-hidden rounded-full">
              <img
                alt="User Avatar"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                className="w-full h-full object-cover"
              />
              <div className=" dark:bg-gray-600 text-black dark:text-white">
                JP
              </div>
            </div>
            <div className="font-bold text-lg ">Jane Doe</div>
            <div className="text-sm ">Software Engineer</div>
            <div className="text-sm ">
              <Link href="#">jane.doe@example.com</Link>
            </div>
          </div>
        </Card>
      </aside>
      <aside className="w-full md:w-1/2">
        <Card className="w-full overflow-hidden shadow-lg">
          <div className=" bg-slate-400 dark:bg-slate-500 text-black dark:text-white p-4">
            <h3 className="text-2xl">Settings</h3>
          </div>
          <div className="space-y-4 p-4">
            <Button className="w-full py-2  dark:bg-gray-600 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              Change Password
            </Button>
            <Button className="w-full py-2  dark:bg-gray-600 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              Update Profile
            </Button>
            <Button className="w-full py-2  dark:bg-gray-600 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
              Privacy Settings
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}
