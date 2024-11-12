import { useQuery } from '@tanstack/react-query';

import { PostData } from '../types';
import { getPostById } from '../utils/api';

const usePostDetail = (postId: string) => {
  return useQuery<PostData, Error>({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostById(postId),
  });
};

export default usePostDetail;
