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

  //**Parent Dashboard */
  'PARENT-DASHBOARD-RECENT':'ParentDashboard/assignment/recent',
  'PARENT-DASHBOARD-SUMMARY':'ParentDashboard/summary',

  //**Parent Student Assignment */
  'PARENT-STUDENT-ASSIGNMENT':'ParentAssignment',
  'PARENT-STUDENT-ASSIGNMENT-DETAIL':'ParentAssignment/:id',
  'PARENT-STUDENT-ASSIGNMENT-LOG':'ParentAssignment/:id/logs',
  'PARENT-STUDENT-ASSIGNMENT-STATUS':'ParentAssignment/status/list',

  //**Student Dashboard */
  'STUDENT-DASHBOARD-RECENT':'StudentDashobard/assignment/recent',
  'STUDENT-DASHBOARD-SUMMARY':'StudentDashobard/summary',

  //**Parent Student Assignment */
  'STUDENT-ASSIGNMENT':'StudentAssignment',
  'STUDENT-ASSIGNMENT-DETAIL':'StudentAssignment/:id',
  'STUDENT-ASSIGNMENT-LOG':'StudentAssignment/:id/logs',
  'STUDENT-ASSIGNMENT-STATUS':'StudentAssignment/status/list',
  'STUDENT-ASSIGNMENT-SUBMIT':'StudentAssignment/submit/:id',


  //**Student Dashboard */
  'STAFF-DASHBOARD-RECENT':'StaffDashboard/assignment/recent',
  'STAFF-DASHBOARD-SUMMARY':'StaffDashboard/summary',

  //**Parent Student Assignment */
  'STAFF-ASSIGNMENT':'StaffAssignment',
  'STAFF-ASSIGNMENT-DETAIL':'StaffAssignment/:Pid',
  'STAFF-STUDENT-ASSIGNMENT-APPROVE':'StaffAssignment/approve/:id',
  'STAFF-STUDENT-ASSIGNMENT-REJECT':'StaffAssignment/reject/:id',
  'STAFF-STUDENT-ASSIGNMENT-ID-LIST':'StaffAssignment/:id/student/assignment/list',
  'STAFF-STUDENT-ASSIGNMENT-LIST':'StaffAssignment/student/assignment/list',
  'STAFF-STUDENT-ASSIGNMENT-ID-DETAIL':'StaffAssignment/:assignemtID/student/:id',
  'STAFF-STUDENT-ASSIGNMENT-DETAIL':'StaffAssignment/student/assignment/:id',
  'STAFF-STUDENT-ASSIGNMENT-LOG':'StaffAssignment/:assignemtID/student/:id/logs',
  'STAFF-STUDENT-ASSIGNMENT-STATUS':'StaffAssignment/status/list'

});
