import { PORTAL_BASE_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const fetchTodos = async ({ endpoint, jwtToken }) => {
  const response = await axios.get(`${PORTAL_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: jwtToken,
      paginate: true,
      pageSize: 10,
      pageNumber: 1,
    },
  });

  return response.data;
};

// You can trigger a manual refetch if needed

export const getListDatas = ({ endpoint }) => {
  const { data: sessionData } = useSession();
  const { jwtToken } = sessionData?.user?.data || {};

  return useQuery({
    queryKey: ['lists'],
    queryFn: () => fetchTodos({ endpoint, jwtToken }),
    enabled: !!endpoint,
  });
};
