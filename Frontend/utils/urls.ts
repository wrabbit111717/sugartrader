/**
 * * auth flow urls
 */
const URL_CHECK_EMAIL_EXIST = '/api/auth/api/user/exists';
const URL_SIGNUP = '/api/auth/register/email';
const URL_LOGIN = '/api/auth/login/email';
const URL_GOOGLE_LOGIN = '/api/auth/login/google';
const URL_TwoFA_CHALLENGE = '/api/auth/two-factor-challenge';
const URL_RESET_PWD = '/api/auth/reset-password';
const URL_FORGOT_PWD = '/api/auth/forgot-password';
const URL_MY_INFO = '/api/users/current';
/**
 * * user collaboration urls
 */
// * group related
const URL_GROUP = '/api/groups';
const URL_CREATE_COOPERATOR = '/api/cooperators';
const URL_REQUESTERS = '/api/requesters';
const URL_REQUESTER_ACCEPT = '/api/requesters/%s/accept';
const URL_REQUESTER_REJECT = '/api/requesters/%s/reject';
// * user related
const URL_GET_USER_BY_ID = '/api/users';
const URL_GET_COOPERATORS = '/api/cooperators';
export const URL_DELETE_COOPERATOR = '/api/cooperators/%s';
const URL_UPDATE_USER_SETTING = '/api/users/settings/account';
const URL_UPDATE_PASSWORD = '/api/users/settings/password';
const URL_REMOVE_ACCOUNT = '/api/users/settings/account';
const URL_UPDATE_DISPLAY_SETTING = '/api/users/settings/display';
const URL_UPDATE_PRODUCTIVITY_SETTING = '/api/users/settings/productivity';
// * list related
const URL_LISTS = '/api/lists';
export const URL_LISTS_FOR_USER = '/api/users/%s/lists';
const URL_LIST_OPERATION = '/api/lists/%s';
const URL_LIST_ARCHIVE = '/api/lists/%s/archive';
const URL_LIST_UNARCHIVE = '/api/lists/%s/unarchive';
export const URL_LIST_SORT_UPDATE = '/api/lists/sorts';
export const URL_LIST_EXIT = '/api/lists/exit/%s';
// * task related
const URL_TASK = '/api/tasks';
export const URL_TASK_FOR_USER = '/api/users/%s/tasks';
export const URL_TASK_DETAIL = '/api/tasks/%s';
export const URL_TASK_OPTIONAL_DETAIL = '/api/tasks/%s/optional';
export const URL_BULK_UPDATE = '/api/tasks/bulk';
export const URL_TASK_PIVOT_DETAIL = '/api/tasks/%s/pivots';
export const URL_TASKS_SORT_UPDATE = '/api/tasks/sorts';
export const URL_TASK_COPY = '/api/tasks/copy';
export const URL_TASKS_FILL_STARTDATE = '/api/users/fill-start-date';
export const URL_TASK_REPETITION = '/api/tasks/repetitions';
export const URL_TASKS_LIST_COUNTS = '/api/users/%s/tasks_count';
// * schedule related
const URL_SCHEDULE = '/api/schedules';
export const URL_SCHEDULE_DETAIL = '/api/schedules/%s';
export const URL_SCHEDULE_COPY = '/api/schedules/copy';
export const URL_SCHEDULE_OPTIONAL_DETAIL = '/api/schedules/%s/optional';
export const URL_SCHEDULE_REPETITION = '/api/schedules/repetitions';
export const URL_SCHEDULE_DELTAUPDATE = '/api/schedules/deltaUpdate';
// * note related
const URL_NOTE = '/api/notes';
const URL_NOTE_DETAIL = '/api/notes/%s';
const URL_NOTE_CHECK = '/api/notes/%s/checked';
// * subscription related
const URL_PAYMENT_BY_STRIPE = '/api/subscriptions/stripe';
const URL_SUBSCRIPTION_USECODE = '/api/subscriptions/use-code';
const URL_SUBSCRIPTION_INVITED_LIST = '/api/subscriptions/invited-users';
const URL_PREMIUM_OWNER = '/api/subscriptions/owners';
const URL_UPDATE_STRIPE_CARD = '/api/subscriptions/stripe/card';
const URL_UPDATE_PAYMENT_QUANTITY = '/api/subscriptions/stripe';
const URL_INVITED_DELETE = '/api/subscriptions/%s';
const URL_DELETE_SUBSCRIPTION = '/api/subscriptions/stripe';
const URL_HISTORY = '/api/subscriptions/histories';
// * file upload
const URL_FILES = '/api/files';
// * work rate related
export const URL_RATE = '/api/uptimes';
export const URL_COLLABOS_RATES = '/api/uptimes/rates';

export const URL_CONTACTUS = '/api/users/contacts';

// * calendar related
export const URL_CALENDAR = '/api/calendar';
export const URL_HOLIDAYS = '/api/calendar/holidays';
export const URL_CALENDAR_LIST = '/api/calendar/list';
export const URL_CALENDAR_RESET = '/api/calendar/resetSync';
export const URL_CALENDAR_REMOVE_EVENT = '/api/calendar/removeSyncedSchedule';
/**
 * * notification related
 */
export const URL_NOTIFICATIONS = '/api/notifications';
export const URL_NOTIFICATION_READ = '/api/notifications/bulk';
/**
 * * frontend routing urls
 */
export const ROOT_URL = '/';
//
export const SIGNIN_URL = '/SignIn';
export const RESET_PASSWORD_URL = '/reset-password';
//
export const TASKS_URL = '/tasks/';
export const TASKS_ALL_URL = '/tasks/all';
export const TASKS_TODAY_URL = '/tasks/today';
export const TASKS_REQUEST_URL = '/tasks/request';
export const TASKS_REQUESTED_URL = '/tasks/requested';
export const TASK_ADD_URL = '/tasks/add';
//
export const SCHEDULE_ADD_URL = '/schedules/add';
export const LIST_URL = '/list';
export const LIST_ADD_URL = '/list/add';
//
export const NOTE_ADD_URL = '/notes/add';
export const NOTES_URL = '/notes';
export const NOTES_ALL_URL = '/notes/all';

//
export const CALENDAR_URL = '/calendar';
//
export const SEARCH_URL = '/search';
export const CONTACTUS_URL = '/contactus';
export const POLICIES_URL = '/policies';
//
export const SETTINGS_URL = '/settings';
export const PRODUCTIVITY_URL = '/settings/productivity';
export const SUBSCRIPTION_URL = '/settings/subscription';
export const POLICY_URL = '/settings/policies';
export const SETTINGS_DISPLAY_URL = '/settings/display';
//
export const NOTE_ALL_URL = '/notes/all';
//
export const DEFAULT_AVATAR_URL = '/default_avatar.png';


export const IMAGE_LOAD_ERRORS: string[] = [
  '/image_load_error1.png',
  '/image_load_error2.png',
  '/image_load_error3.png',
];



/*****New Version for visit plan project */
/**Front End URL */
export const DASBOARD_LIST_URL = '/home/list';
export const ADMIN_EMPLOYEE_URL = '/admin/employee';
export const ADMIN_CLIENT_URL = '/admin/client';
export const ADMIN_PROGRESS_URL = '/admin/progress';
export const ADMIN_MANAGE_URL = '/admin/manage';
export const ADMIN_DELIVERY_URL = '/admin/delivery'
export const ADMIN_URLS = [
  {name: '従業員', path: ADMIN_EMPLOYEE_URL},
  { name: '得意先', path: ADMIN_CLIENT_URL },
  { name: '状況表示', path: ADMIN_PROGRESS_URL },
  { name: '日報/配送', path: ADMIN_DELIVERY_URL},
  { name:'全体管理', path: ADMIN_MANAGE_URL}
]

export const USER_URLS = [
  { name: 'メニュー 1', path: '#'},
  { name: 'メニュー 2', path: '#' },
  { name: 'メニュー 3', path: '#' },
  { name: 'メニュー 4', path: '#' }
]

/**Back End URL */

export const URL_ADMIN_ADD_EMPLOYEE = '/api/admin/add_employee';
export const URL_ADMIN_GET_EMPLOYEE = '/api/admin/get_employee';
export const URL_ADMIN_DELETE_EMPLOYEE = '/api/admin/delete_employee';
export const URL_ADMIN_UPDATE_EMPLOYEE = '/api/admin/update_employee';


export const URL_ADMIN_ADD_CLIENT = '/api/admin/add_client';
export const URL_ADMIN_GET_CLIENT = '/api/admin/get_client';
export const URL_ADMIN_DELETE_CLIENT = '/api/admin/delete_client';
export const URL_ADMIN_UPDATE_CLIENT = '/api/admin/update_client';

export const URL_ADMIN_MANAGE_GET_DATA = '/api/admin/manage/get_data'

export const URL_ADMIN_DELIVERY_GET_PLANS = '/api/admin/delivery/get_plans'
export const URL_ADMIN_DELIVERY_SAVE_ORDER = '/api/admin/delivery/save_order'
export const URL_ADMIN_DELIVERY_UPLOAD_CSV = '/api/admin/delivery/upload_csv'

export const URL_ADMIN_PROGRESS_GET_DATA = '/api/admin/progress/get_data'

export const URL_USER_HOME_GET_PLANS = '/api/user/home/get_plans'
export const URL_USER_HOME_SET_FROM_TIME = '/api/user/home/set_from_time'
export const URL_USER_HOME_SET_TO_TIME = '/api/user/home/set_to_time'
export const URL_USER_HOME_FINISH_VISIT = '/api/user/home/finish_visit'
export const URL_USER_HOME_TAKEOVER = '/api/user/home/save_takeover'
//auth
export const URL_AUTH_SIGNIN = '/auth/signin'
export const URL_AUTH_SIGNUP = '/auth/signup'
export const URL_AUTH_VERIFYEMAIL = '/auth/verifyEmail'

//offer
export const URL_OFFER_NEW = '/offer/create'
export const URL_OFFER_GET_ALL = '/offer/getOffers'
export const URL_OFFER_REQUEST = '/offer/request'

//Negotiation
export const URL_OFFER_GET_NEGOTIATIONS = '/negotiation/getNegotiations'
export const URL_OFFER_GET_NEGOTIATION = '/negotiation/getNegotiation'
export const URL_OFFER_UPDATE_NEGOTIATION = '/negotiation/updateNegotiation'

/** */
export {
  URL_CHECK_EMAIL_EXIST,
  URL_SIGNUP,
  URL_LOGIN,
  URL_GOOGLE_LOGIN,
  URL_TwoFA_CHALLENGE,
  URL_RESET_PWD,
  URL_FORGOT_PWD,
  URL_SCHEDULE,
  URL_NOTE_DETAIL,
  URL_NOTE,
  URL_NOTE_CHECK,
  URL_MY_INFO,
  URL_GROUP,
  URL_GET_USER_BY_ID,
  URL_CREATE_COOPERATOR,
  URL_GET_COOPERATORS,
  URL_REQUESTERS,
  URL_REQUESTER_ACCEPT,
  URL_REQUESTER_REJECT,
  URL_UPDATE_USER_SETTING,
  URL_UPDATE_DISPLAY_SETTING,
  URL_UPDATE_PRODUCTIVITY_SETTING,
  URL_UPDATE_PASSWORD,
  URL_REMOVE_ACCOUNT,
  URL_LISTS,
  URL_TASK,
  URL_PAYMENT_BY_STRIPE,
  URL_SUBSCRIPTION_USECODE,
  URL_SUBSCRIPTION_INVITED_LIST,
  URL_UPDATE_STRIPE_CARD,
  URL_UPDATE_PAYMENT_QUANTITY,
  URL_PREMIUM_OWNER,
  URL_INVITED_DELETE,
  URL_DELETE_SUBSCRIPTION,
  URL_HISTORY,
  URL_FILES,
  URL_LIST_OPERATION,
  URL_LIST_ARCHIVE,
  URL_LIST_UNARCHIVE,
};
