import { useQuery } from '@tanstack/react-query';

import { PostData } from '../../CommunityBoard/types';
import { fetchPostById } from '../../CommunityBoard/utils/api';

const usePostDetail = (postId: string) => {
  return useQuery<PostData, Error>({
    queryKey: ['postDetail', postId],
    queryFn: () => fetchPostById(postId),
  });
};

export default usePostDetail;
