export const ROUTER_PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  USER: '/user',
  GUIDELINE: '/guideline',
  PREVENT: '/prevent/:id',
  COMMUNITY: '/community/:type',
  POST_DETAIL: '/community/post/:postId',
  POSTING: '/community/post',
  PREVENT_RESULT: '/preventResult',
  NOT_FOUND: '*',
  LOGIN: 'login',
  CONSULTING: '/consulting',
} as const;
