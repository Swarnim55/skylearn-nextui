'use client';

import { PORTAL_BASE_URL } from '@/constants';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
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
      <div className="max-w-screen ">
        <Card
          className="max-w-screen-xl min-h-full"
          style={{ margin: '0% auto' }}
        >
          <CardHeader>
            <div className="flex flex-col gap-5" style={{ width: '100%' }}>
              <div
                className="flex justify-between max-w-screen-md"
                style={{ width: '100%' }}
              >
                <Button
                  color="danger"
                  variant="ghost"
                  startContent={<IoArrowBack />}
                  onClick={() => router.back()}
                >
                  Go Back
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => router.push(editRoute)}
                >
                  Edit
                </Button>
              </div>

              <p className="font-semibold text-2xl">{data.data[titleKey]}</p>
            </div>
          </CardHeader>
          <CardBody className="max-w-screen-md">
            <div className="grid-container mt-5">{renderedData}</div>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default DetailLayout;
