import { useEffect, useState } from 'react';

import { HotTopicData } from '../types';
import { fetchHotTopics } from '../utils/api';

const useHotTopics = (boardType: string) => {
  const [hotTopics, setHotTopics] = useState<HotTopicData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotTopics = async () => {
      setLoading(true);
      try {
        const data = await fetchHotTopics(boardType);
        setHotTopics(data);
        setError(null);
      } catch {
        setError('인기 게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadHotTopics();
  }, [boardType]);

  return { hotTopics, loading, error };
};

export default useHotTopics;
