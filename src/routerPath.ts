export const ROUTER_PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  USER: '/user',
  GUIDELINE: '/guideline',
  JOURNEY_PREVIEW: '/preview',
  PREVENT: '/prevent/:id',
  COMMUNITY: '/community/:type',
  POST_DETAIL: '/community/:type/post',
  POSTING: '/community/post',
  PREVENT_RESULT: '/preventResult',
  NOT_FOUND: '*',
  LOGIN: 'login',
  CONSULTING: '/consulting',
  SURVEY: '/survey',
  DOCUMENT_FORM: '/documentForm',
  CONSULTING_HISTORY: '/consulting/consultingHistory',
  SELECT_MENTOR: '/consulting/selectMentor',
  CONSULTING_SCHEDULING: '/consulting/selectMentor/scheduling/:name',
  CONSULTING_START: '/consulting/start',
  PREVIOUS_CONSULTING: '/consulting/previous_consulting',
} as const;
