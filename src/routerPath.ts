export const ROUTER_PATH = {
  ROOT: '/',
  WELCOME: '/welcome',
  USER: '/user',
  GUIDELINE: '/guideline',
  JOURNEY_PREVIEW: '/preview',
  PREVENT: '/prevent/:id',
  COMMUNITY: '/community/:type',
  POST_DETAIL: '/community/post/:postId',
  POSTING: '/community/post',
  PREVENT_RESULT: '/preventResult',
  NOT_FOUND: '*',
  LOGIN: 'login',
  CONSULTING: '/consulting',
  SURVEY: '/survey',
  DOCUMENT_FORM: '/documentForm',
  CONSULTING_HISTORY: '/consulting/consultingHistory',
  SELECT_MENTOR: '/consulting/selectMentor',
  CONSULTING_SCHEDULING: '/consulting/selectMentor/scheduling/:id',
  CONSULTING_START: '/consulting/start',
  PREVIOUS_CONSULTING: '/consulting/previous',
  REPORTDETAIL: '/preventResult/detail',
  CHANGEALERT: '/preventResult/alert',
  AUCTION: '/preventResult/auction',
  CHANNEL: '/preventResult/channel',
  CONSULTING_CHAT: '/consulting/start/:id',
  MENTOR_DATE_REGISTRATION: '/mentor/registration',
  MENTOR_CONFIRM_REQUEST: '/mentor/confirm',
  MENTOR_SCHEDULED: 'mentor/scheduled',
  MENTOR_CHAT: 'mentor/scheduled/chat/:id',
  MENTOR_CONSULTING_HISTORY: 'mentor/history',
} as const;
