import React, { Suspense } from "react";
import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import Loading from "../components/Loading/Loading";
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
const ImageUpload = React.lazy(() => import("../config/uploadImage"));
const Setting = React.lazy(() => import("../pages/auth/screen/Setting"));

const ManagerBlogs = React.lazy(
  () => import("../pages/auth/screen/ManagerBlogs")
);
const ManagerUsers = React.lazy(
  () => import("../pages/auth/screen/ManagerUser")
);
const Post = React.lazy(() => import("../pages/posts/screen/posts"));

// Create the router configuration
const routerConfig = [
  {
    element: (
      <Suspense>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense>
            <HomeLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.main,
            element: (
              <Suspense>
                <Homepage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.post,
            element: (
              <Suspense>
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
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/upload",
        element: (
          <Suspense fallback={<Loading />}>
            <ImageUpload />
          </Suspense>
        ),
      },
      {
        path: ROUTES.auth,
        element: (
          <Suspense fallback={<Loading />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.managerBlogs,
            element: (
              <Suspense fallback={<Loading />}>
                <ManagerBlogs />
              </Suspense>
            ),
          },
          {
            path: ROUTES.createBlog,
            element: (
              <Suspense fallback={<Loading />}>
                <CreateBlog />
              </Suspense>
            ),
          },
          {
            path: ROUTES.managerUser,
            element: (
              <Suspense fallback={<Loading />}>
                <ManagerUsers />
              </Suspense>
            ),
          },
          {
            path: ROUTES.editUser,
            element: (
              <Suspense fallback={<Loading />}>
                <EditUser />
              </Suspense>
            ),
          },
          {
            path: ROUTES.editBlog,
            element: (
              <Suspense fallback={<Loading />}>
                <EditBlog />
              </Suspense>
            ),
          },
          {
            path: ROUTES.settings,
            element: (
              <Suspense fallback={<Loading />}>
                <Setting />
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
      <Suspense fallback={<Loading />}>
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
