// import { lazy } from 'react';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import ErrorPage from '~/components/error/ErrorPage';
// import RootLayout from '~/modules/root/screens/root-layout/RootLayout';
// import { ROUTES } from './routes';

// const PrivateLayout = lazy(
//   () => import('~/modules/root/screens/private-layout/PrivateLayout'),
// );
// const LoginPage = lazy(() => import('~/modules/auth/screens/login/LoginPage'));
// const MainPage = lazy(() => import('~/modules/main/screens/MainPage'));
// const TasksPage = lazy(() => import('~/modules/tasks/screens/tasks/TasksPage'));
// const MapPage = lazy(() => import('~/modules/map/screens/MapPage'));
// const FacilitiesPage = lazy(
//   () => import('~/modules/facilities/screens/list/FacilityListPage'),
// );
// const FacilityDetailPage = lazy(
//   () => import('~/modules/facilities/screens/detail/FacilityDetailPage'),
// );
// const InspectionListPage = lazy(
//   () => import('~/modules/inspections/screens/list/InspectionListPage'),
// );
// const InspectionDetailPage = lazy(
//   () => import('~/modules/inspections/screens/detail/InspectionDetailPage'),
// );
// const SettingsPage = lazy(
//   () => import('~/modules/settings/screens/SettingsPage'),
// );
// const UserRegistrationPage = lazy(
//   () =>
//     import('~/modules/user-registration/screens/screen1/UserRegistrationPage'),
// );
// const UserRegistrationPage2 = lazy(
//   () =>
//     import('~/modules/user-registration/screens/screen2/UserRegistrationPage2'),
// );
// const FacilityRegistrationPage = lazy(
//   () =>
//     import(
//       '~/modules/facility-registration/screens/screen1/FacilityRegistrationPage'
//     ),
// );
// const FacilityRegistrationPage2 = lazy(
//   () =>
//     import(
//       '~/modules/facility-registration/screens/screen2/FacilityRegistrationPage2'
//     ),
// );
// const SchedulePage = lazy(
//   () => import('~/modules/schedule/screens/SchedulePage'),
// );
// const ApprovalPage = lazy(
//   () => import('~/modules/approval/screens/ApprovalPage'),
// );

// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         element: <PrivateLayout />,
//         children: [
//           {
//             path: ROUTES.main,
//             element: <MainPage />,
//           },
//           {
//             path: ROUTES.tasks,
//             element: <TasksPage />,
//           },
//           {
//             path: ROUTES.map,
//             element: <MapPage />,
//           },
//           {
//             path: ROUTES.facilities,
//             element: <FacilitiesPage />,
//           },
//           {
//             path: `${ROUTES.facilities}/:facilityId`,
//             element: <FacilityDetailPage />,
//           },
//           {
//             path: ROUTES.inspections,
//             element: <InspectionListPage />,
//           },
//           {
//             path: `${ROUTES.inspections}/:inspectionId`,
//             element: <InspectionDetailPage />,
//           },
//           {
//             path: ROUTES.settings,
//             element: <SettingsPage />,
//           },
//           {
//             path: ROUTES.userRegistration,
//             element: <UserRegistrationPage />,
//           },
//           {
//             path: ROUTES.userRegistration2,
//             element: <UserRegistrationPage2 />,
//           },
//           {
//             path: ROUTES.facilityRegistration,
//             element: <FacilityRegistrationPage />,
//           },
//           {
//             path: ROUTES.facilityRegistration2,
//             element: <FacilityRegistrationPage2 />,
//           },
//           {
//             path: ROUTES.schedule,
//             element: <SchedulePage />,
//           },
//           {
//             path: ROUTES.approval,
//             element: <ApprovalPage />,
//           },
//         ],
//       },
//       {
//         path: ROUTES.login,
//         element: <LoginPage />,
//       },
//     ],
//   },
// ]);

// function Router() {
//   return <RouterProvider router={router} />;
// }

// export default Router;
