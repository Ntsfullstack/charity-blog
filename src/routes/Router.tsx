import React,{lazy}  from "react";
import { ROUTES }  from "./routes";
import { createBrowserRouter, RouterProvider}  from "react-router-dom";
const RootLayout = lazy(() => import("../layout/root/RootLayout"));
const ErrorPage = lazy(() => import("../components/error/ErrorPage"));
const AdminLayout = lazy(() => import("../pages/auth/screen/AdminLayout"));
const Homepage = lazy(() => import("../pages/home/screen"));
const CreateBlog = lazy(() => import("../pages/auth/screen/CreateBlog"));
const Login = lazy(() => import("../pages/login/login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.main,
        element: <Homepage />,
      },

      {
        path: ROUTES.settings,
        element: <div>Settings</div>,
      },
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        path: ROUTES.auth,
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.createBlog,
            element: <CreateBlog />,
          },
          {
            path: ROUTES.managerBlogs,
            element: <div>managerBlogs</div>,
          },
         
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
