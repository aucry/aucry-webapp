import { PartialRouteObject } from 'react-router';

import { Navigate } from 'react-router-dom';

import ExtendedSidebarLayout from 'src/layouts';
import baseRoutes from './base';

const router: PartialRouteObject[] = [
  {
    path: '*',
    element: (
        <ExtendedSidebarLayout />
    ),
    children: [
      {
        children: baseRoutes
      },
      {
        path: '/',
        element: <Navigate to="dashboards" replace />
      }
    ]
  }
];

export default router;
