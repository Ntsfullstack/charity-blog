export const ROUTES = {
  main: "/",
  login: "/login",
  register: "/register",
  auth: "/auth",
  managerBlogs: "manager-blog",
  managerUser: "manager-user",
  createBlog: "create-blog",
  editUser: "edit-user/:id",
  editBlog: "edit-blog/:slug",
  settings: "settings",
  post: "/post/:slug",
} as const;
