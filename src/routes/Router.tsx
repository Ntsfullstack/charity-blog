import React, { Suspense } from "react";
import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

// Import components using lazy loading
const EditUser = React.lazy(() => import("../pages/auth/screen/EditUser"));
const EditBlog = React.lazy(() => import("../pages/auth/screen/EditBlog"));
const RootLayout = React.lazy(() => import("../layout/root/RootLayout"));
const AdminLayout = React.lazy(() => import("../layout/AdminLayout"));
const ErrorPage = React.lazy(() => import("../components/error/ErrorPage"));
const HomeLayout = React.lazy(() => import("../layout/HomeLayout"));
const Homepage = React.lazy(() => import("../pages/home/screen"));
const CreateBlog = React.lazy(() => import("../pages/auth/screen/CreateBlog"));
const Login = React.lazy(() => import("../pages/login/login"));
const Register = React.lazy(() => import("../pages/register/register"));
const ManagerBlogs = React.lazy(() => import("../pages/auth/screen/ManagerBlogs"));
const ManagerUsers = React.lazy(() => import("../pages/auth/screen/ManagerUser"));
const Post = React.lazy(() => import("../pages/posts/screen/posts"));

// Create the router configuration
const routerConfig = [
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomeLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.main,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Homepage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.post,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Post />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: ROUTES.settings,
        element: <div>Settings</div>,
      },
      {
        path: ROUTES.register,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: ROUTES.auth,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.managerBlogs,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ManagerBlogs />
              </Suspense>
            ),
          },
          {
            path: ROUTES.createBlog,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CreateBlog />
              </Suspense>
            ),
          },
          {
            path: ROUTES.managerUser,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ManagerUsers />
              </Suspense>
            ),
          },
          {
            path: ROUTES.editUser,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditUser />
              </Suspense>
            ),
          },
          {
            path: ROUTES.editBlog,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditBlog />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.login,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
];

// Create the router
const router = createBrowserRouter(routerConfig);

function Router() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default Router;
