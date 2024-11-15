import { ChatResponse } from '@apis/chat/types';

import apiInstance from '@/apis';

export const loadChatData = async (chatId: number): Promise<ChatResponse> => {
  const response = await apiInstance.get(`/api/v1/chat/${chatId}?size=10000`);

  return response.data;
};
