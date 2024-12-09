import { lazy } from 'react';

const HomepageContainer = lazy(() => import('@/pages/HomepageContainer'));

export interface AppRoute {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
}

const routes: AppRoute[] = [
  {
    path: '/',
    element: HomepageContainer,
  },
];

export default routes;
