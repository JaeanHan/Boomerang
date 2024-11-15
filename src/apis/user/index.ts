import apiInstance from '@/apis';
import { useQuery } from '@tanstack/react-query';

const getNicknameRecommendation = async (): Promise<{
  nickname: string;
}> => {
  const response = await apiInstance.get('/api/v1/member/random-nickname');

  return response.data;
};

export const getUserInfo = async (): Promise<{
  nickname: string;
  profile_image: string;
  email: string;
  member_role: 'COMPLETE_USER' | 'MENTOR';
}> => {
  const response = await apiInstance.get('/api/v1/member');

  return response.data;
};

export const useNicknameRecommendation = () => {
  return useQuery({
    queryKey: ['nicknameRecommendation'],
    queryFn: getNicknameRecommendation,
  });
};

export const confirmNickname = async (
  nickname: string
): Promise<{
  member_role: string;
  nickname: string;
}> => {
  const response = await apiInstance.put('/api/v1/member/nickname', {
    new_nickname: nickname,
  });

  return response.data;
};

export const updateProfileImage = async (
  imageFile: File
): Promise<{
  profile_image: string;
}> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await apiInstance.put('/api/v1/member/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
