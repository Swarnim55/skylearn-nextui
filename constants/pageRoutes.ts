export const pageRoutes = Object.freeze({
  //**DASHBOARD */
  DASHBOARD: '/dashboard',

  //**CONTENT */
  CONTENT: '/content',
  'CONTENT-DETAIL': '/content/detail/:id',
  'CONTENT-EDIT': '/content/edit/:id',
  'CONTENT-CREATE': '/content/create',

  //**USER */
  USERS: '/users',
  'USERS-DETAIL': '/users/detail/:id',
  'USERS-EDIT': '/users/edit/:id',
  'USERS-CREATE': '/users/create',

  //**ROLES */
  ROLES: '/roles',
  'ROLES-EDIT': '/roles/edit/:id',
  'ROLES-CREATE': '/roles/create',

  //**DEPARTMENT */
  DEPARTMENTS: '/departments',
  'DEPARTMENTS-DETAIL': '/departments/:departmentIdx/detail',
  'DEPARTMENTS-EDIT': '/departments/:departmentIdx/edit',

  //**SEMESTER */
  SEMESTER: '/semester',
  'SEMESTER-DETAIL': '/semester/detail/:id',
  'SEMESTER-EDIT': '/semester/edit/:id',
  'SEMESTER-CREATE': '/semester/create',

  //**ASSIGNMENTS */
  ASSIGNMENTS: '/assignments',
  'ASSIGNMENTS-DETAIL': '/assignments/detail/:id',
  'ASSIGNMENTS-EDIT': '/assignments/edit/:id',
  'ASSIGNMENTS-CREATE': '/assignments/create',
});
