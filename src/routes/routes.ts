export const ROUTES = {
  main: "/",
  login: "/login",
  register: "/register",
  auth: "/auth",
  managerBlogs: "manager-blog",
  createBlog: "create-blog",
  editUser: "edit-user/:id",
  editBlog: "edit-blog/:slug",
  settings: "settings",
  post: "/post/:slug",
  MainPage: "/MainPage",
  SearchPost: "/search/:query",
} as const;
