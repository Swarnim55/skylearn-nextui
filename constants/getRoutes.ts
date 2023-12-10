import { apiRoutes } from './apiRoutes';
import { pageRoutes } from './pageRoutes';

export function getApiRoute(key: keyof typeof apiRoutes) {
  return apiRoutes[key];
}
export function getPageRoute(key: keyof typeof pageRoutes) {
  return '/dashboard' + pageRoutes[key];
}
