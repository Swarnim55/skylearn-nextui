export const apiRoutes = Object.freeze({
  //**AUTH */
  LOGIN: 'Auth/login',

  //**CONTENT */
  CONTENT: 'content',
  'CONTENT-DETAIL': 'content/:id',

  //**USER */
  USER: 'user',
  'USER-DETAIL': 'user/:id',
  'USER-VERIFY': 'Auth/verify-user?token=:token',

  //**ROLES */
  ROLES: 'roles',

  //**PERMISSIONS */
  PERMISSIONS: 'Permission',

  //**DEPARTMENTS */
  DEPARTMENTS: 'department',
  'DEPARTMENTS-DETAIL': 'department/:id',

  //**SEMESTER */
  SEMESTER: 'semester',
  'SEMESTER-DETAIL': 'semester/:id',

  //**ASSIGNMENTS */
  ASSIGNMENT: 'assignment',
  'ASSIGNMENT-DETAIL': 'assignment/:id',

  //**COURSES */
  COURSES: 'courses',
  'COURSES-DETAIL': 'courses/:id',

  //**STUDENTS */
  STUDENTS: 'student',
  'STUDENTS-DETAIL': 'student/:id',

    //**Forgot Password*/
  'FORGOT-PASSWORD':'User/forgot-password',

  //**Change Password*/
  'CHANGE-PASSWORD':"User/reset-password",

  //**Staff */
  STAFF:"staff",
  'STAFF-DETAIL':'staff/:id'
});
