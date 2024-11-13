import LoadingSpinner from '@components/CommunityBoard/LoadingSpinner';

import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiInstance from '@/apis';
import { User, useUserContext } from '@/pages/Login/userContext';
import { ROUTER_PATH } from '@/routerPath';
import axios, { AxiosResponse } from 'axios';

interface KakaoAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface LoginResponse {
  data: {
    member_role: string;
    nickname: string;
  };
  headers: {
    authorization: string;
  };
}

export const Login = () => {
  const navigate = useNavigate();
  const authCode = new URL(window.location.href).searchParams.get('code');
  const { login: saveUser } = useUserContext();

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', import.meta.env.VITE_REST_API_KEY);
    params.append('redirect_uri', import.meta.env.VITE_REDIRECT_URI);
    params.append('code', authCode ?? '');

    return await axios.post<KakaoAuthResponse>(
      'https://kauth.kakao.com/oauth/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
  };

  const login = (
    res: AxiosResponse<KakaoAuthResponse>
  ): Promise<LoginResponse> => {
    const { access_token } = res.data;

    return apiInstance.post('/api/v1/auth/login/kakao', {
      access_token: access_token,
    });
  };

  const saveAuth = (res: LoginResponse) => {
    const { member_role, nickname } = res.data;
    const auth = res.headers['authorization'];

    localStorage.setItem('Authorization', auth);

    const userData: User = {
      member_role: member_role,
      nickname: nickname,
    };
    saveUser(userData);

    if (member_role === 'COMPLETE_USER') {
      localStorage.setItem('Nickname', nickname);
      navigate(ROUTER_PATH.ROOT);
    } else {
      navigate(ROUTER_PATH.WELCOME);
    }
  };

  useEffect(() => {
    getAccessToken().then(login).then(saveAuth);
  }, []);

  return (
    <Fragment>
      <LoadingSpinner />
      로그인중
    </Fragment>
  );
};
