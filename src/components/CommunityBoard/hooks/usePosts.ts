import { useEffect, useState } from 'react';

import { PostData } from '../types';
import { fetchPosts } from '../utils/api';

const usePosts = (
  page: number,
  boardType: string,
  searchWord?: string,
  sortType: 'ID' | 'LIKE' | 'COMMENT' = 'ID'
) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts(page, boardType, searchWord, sortType);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, boardType, searchWord, sortType]);

  return { posts, totalPages, loading, error };
};

export default usePosts;
