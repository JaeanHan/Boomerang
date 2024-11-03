import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PostData } from '../../CommunityBoard/types';
import { fetchPostById } from '../../CommunityBoard/utils/api';

const usePostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (postId) {
          const data = await fetchPostById(postId);
          setPost(data);
        }
      } catch {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  return { post, loading, error };
};

export default usePostDetail;
