import LoadingSpinner from '@components/CommunityBoard/LoadingSpinner';

import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiInstance from '@/apis';
import { ROUTER_PATH } from '@/routerPath';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const authCode = new URL(window.location.href).searchParams.get('code');

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', import.meta.env.VITE_REST_API_KEY);
    params.append('redirect_uri', import.meta.env.VITE_REDIRECT_URI);
    params.append('code', authCode);

    return await axios.post('https://kauth.kakao.com/oauth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  };

  const login = (res) => {
    const { access_token, refresh_token, expires_in } = res.data;

    return apiInstance.post('/api/v1/auth/login/kakao', {
      access_token: access_token,
    });
  };

  const saveAuth = (res) => {
    const { member_role, nickname } = res.data;
    const auth = res.headers['authorization'];

    localStorage.setItem('Authorization', auth);
    localStorage.setItem('Nickname', nickname);

    if (member_role === 'COMPLETE_USER') {
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
