'use client';

import { PORTAL_BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { forEach } from 'lodash';
import { useSession } from 'next-auth/react';
import './detail.css';

const DetailLayout = ({
  endpoint,
  detailId,
}: {
  endpoint: string;
  detailId: string;
}) => {
  const { data: sessionData } = useSession();
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

  if (isSuccess) {
    console.log('data', data);
    const renderedData = Object.entries(data.data).map(([key, value]) => (
      <div className="grid-row">
        <div className="grid-key">
          {key.toLowerCase().charAt(0).toUpperCase() + key.slice(1)}
        </div>
        <div className="grid-column">{value || ''}</div>
      </div>
    ));
    return (
      <div className="maxW-full">
        <div className="grid-container" style={{ margin: '0px auto' }}>
          {renderedData}
        </div>
      </div>
    );
  }
};

export default DetailLayout;
