import apiInstance from '@/apis';
import { CommunityPostData } from '@/templates/Community/CommunityPosting';
import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

export type UploadPostData = CommunityPostData & {
  images: File[];
};

export const useCommunityPostMutation = () => {
  return useMutation<UploadPostResponse, Error, UploadPostData>({
    mutationFn: (postData: UploadPostData) => uploadPost(postData),
  });
};

export type UploadPostResponse = {
  id: number;
  title: string;
  content: string;
  writer_nickname: string;
  board_type: string;
  location: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  liked: boolean;
};

const uploadPost = async ({
  title,
  content,
  boardType,
  images,
  location = 'BUSAN',
}: UploadPostData): Promise<UploadPostResponse> => {
  const formData = new FormData();

  formData.append(
    'data',
    new Blob(
      [
        JSON.stringify({
          title: title,
          content: content,
          board_type: boardType,
          location: location,
        }),
      ],
      {
        type: 'application/json',
      }
    )
  );

  formData.append('content', content);

  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await apiInstance.post<UploadPostResponse>(
    '/api/v1/board',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};
