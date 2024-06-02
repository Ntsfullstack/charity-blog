import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/root/RootLayout";
import ErrorPage from "../components/error/ErrorPage";
import { ROUTES } from "./routes";
import AdminLayout from "../pages/auth/screen/AdminLayout";
import Homepage from "../pages/home/screen";
import Login from "../pages/login/login";
import CreateBlog from "../pages/auth/screen/CreateBlog";

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
