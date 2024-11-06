export const ROUTER_PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  USER: '/user',
  GUIDELINE: '/guideline',
  PREVENT: '/prevent/:id',
  COMMUNITY: '/community/:type',
  POST_DETAIL: '/community/:type/post',
  POSTING: '/community/post',
  NOT_FOUND: '*',
  LOGIN: 'login',
} as const;
