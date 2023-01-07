import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';
import AuctionListView from "../content/auctions/AuctionListView";
import AuctionDetailView from "../content/auctions/AuctionDetailView";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/pages/Home/index')));
const Auctions = Loader(lazy(() => import('src/content/pages/Auctions/index')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const ManageApprovals = Loader(
    lazy(() => import('src/content/approvals/index'))
);
const Profile = Loader(
    lazy(() => import('src/content/users/index'))
);
const CreateAuction = Loader(
    lazy(() => import('src/content/createauction/index'))
);

const baseRoutes = [
  {
    path: '/',
    element: <Auctions />
  },
  {
    path: 'overview',
    element: <Navigate to="/" replace />
  },
  {
    path: 'my-account',
    element: <ManageApprovals />
  },
  {
    path: 'auctions/create',
    element: <CreateAuction />
  },
  {
    path: 'auctions',
    element: <Auctions />
  },
  {
    path: 'auctions/:auctionCurrency/:auctionAddress',
    element: <AuctionDetailView />
  },
  {
    path: 'auctions/:auctionCurrency',
    element: <AuctionListView />
  },
  {
    path: 'users/:userAddress',
    element: <Profile />
  },
  {
    path: 'status',
    children: [
      {
        path: '/',
        element: <Navigate to="404" replace />
      },
      {
        path: '',
        element: <Status404 />
      },
      {
        path: '500',
        element: <Status500 />
      },
      {
        path: 'maintenance',
        element: <StatusMaintenance />
      },
      {
        path: 'coming-soon',
        element: <StatusComingSoon />
      }
    ]
  },
  {
    path: '*',
    element: <Status404 />
  }
];

export default baseRoutes;
