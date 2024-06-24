import React, { Suspense } from "react";
import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import Loading from "../components/Loading/Loading";
import ProtectedRoute from "../layout/ProtectedRoute"; // Import ProtectedRoute

// Import components using lazy loading
// const  AboutUs = React.lazy(() => import ("../pages/main_page"));
const MainPage = React.lazy(() => import("../pages/main_page/screen/MainPage"));
const EditBlog = React.lazy(() => import("../pages/auth/screen/EditBlog"));
const RootLayout = React.lazy(() => import("../layout/root/RootLayout"));
const AdminLayout = React.lazy(() => import("../layout/AdminLayout"));
const ErrorPage = React.lazy(() => import("../components/error/ErrorPage"));
const HomeLayout = React.lazy(() => import("../layout/HomeLayout"));
const Homepage = React.lazy(() => import("../pages/home/screen/Home"));
const CreateBlog = React.lazy(() => import("../pages/auth/screen/CreateBlog"));
const Login = React.lazy(() => import("../pages/login/login"));
const Register = React.lazy(() => import("../pages/register/register"));
const ImageUpload = React.lazy(() => import("../config/uploadImage"));
const Setting = React.lazy(() => import("../pages/auth/screen/Setting"));
const SearchPost = React.lazy(() => import("../pages/SeachPost/SearchPost"));
const ManagerBlogs = React.lazy(
  () => import("../pages/auth/screen/ManagerBlogs")
);
const Post = React.lazy(() => import("../pages/posts/screen/posts"));

// Create the router configuration
const routerConfig = [
  {
    element: (
      <Suspense fallback={<Loading />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<Loading />}>
            <HomeLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTES.main,
            element: (
              <Suspense fallback={<Loading />}>
                <Homepage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.SearchPost,
            element: (
              <Suspense fallback={<Loading />}>
                <SearchPost />
              </Suspense>
            ),
          },
          {
            path: ROUTES.post,
            element: (
              <Suspense fallback={<Loading />}>
                <Post />
              </Suspense>
            ),
          },
          {
            path: ROUTES.MainPage,
            element: (
              <Suspense fallback={<Loading />}>
                <MainPage />
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
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            path: ROUTES.managerBlogs,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <ManagerBlogs />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.createBlog,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <CreateBlog />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.editBlog,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <EditBlog />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.settings,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Setting />
                </Suspense>
              </ProtectedRoute>
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
