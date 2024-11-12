import apiInstance from '@/apis';

export const getMentorsList = async () => {
  const response = await apiInstance.get('api/v1/mentor');

  return response.data;
};
