'use client';
import { PORTAL_BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const getListDatas = ({ endpoint }: { endpoint: any }) => {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};

  // Check if endpoint is defined before creating and executing the query
  if (!endpoint) {
    return null; // or handle it as needed
  }
  // const {data} =  useQuery(['test'], axios.get(`${PORTAL_BASE_URL}${endpoint}`));
  const fetchTodos = () =>
    axios
      .get(`${PORTAL_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: jwtToken,
          paginate: true,
          pageSize: 10,
          pageNumber: 1,
        },
      })
      .then((res) => res.data);

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['lists'],
    queryFn: fetchTodos,
    enabled: !!endpoint,
  });

  useEffect(() => {
    // You can trigger a manual refetch if needed
    if (endpoint) {
      refetch();
    }
  }, [endpoint, refetch]);

  if (isError) {
    return `Error: ${error.message}`;
  }

  if (isLoading) {
    return 'loading';
  }
  if (!endpoint) {
    return null; // or loading state or placeholder
  }

  return data;
};
