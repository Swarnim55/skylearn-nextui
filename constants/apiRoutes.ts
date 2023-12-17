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
  STUDENTS: 'students',
  'STUDENTS-DETAIL': 'students/:id',

  //**Forgot Password*/
  'FORGOT-PASSWORD':'User/forgot-password'
});
