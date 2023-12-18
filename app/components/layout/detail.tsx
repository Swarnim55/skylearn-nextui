'use client';

import { PORTAL_BASE_URL } from '@/constants';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import './detail.css';

const DetailLayout = ({
  endpoint,
  detailId,
  editRoute,
  titleKey,
  omittedKeys = [],
}: {
  endpoint: string;
  detailId: string;
  editRoute: string;
  titleKey: string;
  omittedKeys?: string[];
}) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { jwtToken } = sessionData?.user?.data || {};
  const fetchDataDetail = async ({
    endpoint,
    jwtToken,
    detailId,
  }: {
    endpoint: string;
    jwtToken: string;
    detailId: string;
  }) => {
    const response = await axios.get(
      `${PORTAL_BASE_URL}${endpoint}/${detailId}`,
      {
        //   params: {
        //     paginate: true,
        //     pageSize: rowsPerPage,
        //     pageNumber: page,
        //   },

        headers: {
          Authorization: jwtToken,
        },
      }
    );

    return response.data;
  };
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [jwtToken, detailId],
    queryFn: () =>
      fetchDataDetail({
        endpoint: endpoint,
        detailId: detailId,
        jwtToken: jwtToken,
      }),
    // ⬇️ disabled as long as the jwtToken is empty
    enabled: !!jwtToken && !!detailId,
  });

  if (isLoading) {
    // Skeleton loading effect
    const skeletonRows = Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="skeleton-row">
        <div className="skeleton-key" />
        <div className="skeleton-value" />
      </div>
    ));

    return <div className="skeleton-container">{skeletonRows}</div>;
  }
  const getValue = (valueType: string, value: any) => {
    switch (valueType) {
      case 'string':
        return value;
      case 'number':
        return value;
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return value;
    }
  };
  if (isSuccess) {
    const renderedData = Object.entries(data.data)
      .filter(([key]) => !omittedKeys.includes(key))
      .map(([key, value]) => {
        const valueType = typeof value;
        return (
          <div className="grid-row" key={key}>
            <div className="grid-key">
              {key.toLowerCase().charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <div className="grid-column">{getValue(valueType, value)}</div>
          </div>
        );
      });
    return (
      <div className="max-w-screen-md">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Button
              color="danger"
              variant="bordered"
              startContent={<IoArrowBack />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
            <Button
              color="primary"
              variant="bordered"
              onClick={() => router.push(editRoute)}
            >
              Edit
            </Button>
          </div>
          <div className="flex-initial w-64">
            <p className="font-semibold text-3xl">{data.data[titleKey]}</p>
          </div>
        </div>
        <div className="grid-container mt-5">{renderedData}</div>
      </div>
    );
  }
};

export default DetailLayout;
