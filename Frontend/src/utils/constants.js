export const HTTP_STATUS_CODES = {
  unauthorized: 401,
};

export const EMAIL_FORMAT_REGEX = /^[a-z0-9_]+@[a-z]+.[a-z]{2,4}$/;
export const PASSWORD_FORMAT_REGEX = '';
export const PHONE_NUMBER_FORMAT_REGEX = /^[0-9]*$/;
export const DATE_FORMAT_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const APP_PAGE_URLS = {
  register: 'register',
  login: 'login',
  main: 'main',
  services: 'services',
  adminServices: 'admin/services',
  adminCars: 'admin/cars',
  bills: 'bills',
  addService: 'addService',
  service: 'service',
  editService: 'editService',
  messages: 'messages',
};

export const USER_TYPE = {
  admin: 0,
  staff: 1,
  client: 2,
};

export const API_URLS = {
  users: '/users/:userId',
  authenticate: '/authenticate',
  currentUser: '/currentUser',
  allUsers: '/users',
  deleteUserById: '/user/delete/:id',
  register: '/register',
  services: '/users/:userId/services',
  getServices: '/services',
  serviceById: '/service/edit/:id',
  deleteServiceById: '/service/delete/:id',
  addService: '/insertService',
  getCars: '/cars/get',
  getCarProblems: '/car/get/problems',
  getCarjobs: '/carJobs/get',
  getCarRepairsByCarId: '/car/repair/get/:carId',
  insertCarRepair: '/carJob/insert',
  getReservations: '/reservations/get',
  reservationInsert: '/reservation/add',
  editReservationLimit: "service/edit/reservation/limit/:serviceId",
  carDelete: "/carJob/delete",
  addCustomReservationLimits: "/customReservationLimits/add",
  addCustomReservationLimit: "/customReservationLimit/add",
  getCustomReservationLimit: "/customReservationLimits/get",
  getReservationLimitByServiceId: "/reservationLimit/get/:serviceId",
  getReservationLimits: "/reservationLimits/get/:serviceId",
  carStatusEditById: "/car/edit/status",
  getMessages: "/messages/get",
  insertMessage: "/message/insert",
  seenMessageById: '/message/seen/:id',
};


export const MONTHS = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};


export const CAR_SUMMARY_STATUSSES = {
  0: 'waiting',
  1: 'inService',
  2: 'inProgress',
  3: 'finished',
  4: 'cancelled'
};

export const BUTTON_TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  remove: 'delete',
  add: 'add',
  disable: 'disable',
  green: 'green',
};

export const COMBUSTIBLE = {
  DIESEL: 1,
  GAS: 0,

};

export const STATUSSES = {
  WAITING: 0,
  IN_SERVICE: 1,
  IN_PROGRESS: 2,
  FINISHED: 3,
  CANCELED: 4,
  PICKED: 5 

};

export const PROBLEMS = {
  option0: "Oil Change",
  option1: "Tire Change",
  option2: "Wheel Alignment",
  option3: "Change Breaks",
  option4: "Air Conditioning Problems",
  option5: "Car Check",

};

export const MESSAGES = {
  RETRIEVE_INTERVAL: 300000,
};

export const API_REQUEST_METHODS = {
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
};

export const SERVER_RESPONSE = {
  success: 'Success',
  error: 'Error',
};

export const TIMER = {
  showNotification: 4000,
  inactivity: 1800000,
};

export const MESSAGE_STATUS = {
  unread: 1,
  read: 2,
};

export const LOGIN_INPUT_TYPES = {
  text: 'text',
  password: 'password',
};
