import React, { lazy, Suspense } from "react";
import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("../layout/root/RootLayout"));
const ErrorPage = lazy(() => import("../components/error/ErrorPage"));
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const Homepage = lazy(() => import("../pages/home/screen"));
const CreateBlog = lazy(() => import("../pages/auth/screen/CreateBlog"));
const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/register/register"));
const ManagerBlogs = lazy(() => import("../pages/auth/screen/ManagerBlogs"));
const ManagerUsers = lazy(() => import("../pages/auth/screen/ManagerUser"));

const router = createBrowserRouter([
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
        path: ROUTES.main,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        ),
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
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
