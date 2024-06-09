export const ROUTES = {
  main: "/",
  settings: "/settings",
  login: "/login",
  register: "/register",
  auth: "/auth",
  managerBlogs: "manager-blog",
  managerUser: "manager-user",
  createBlog: "create-blog",
  editUser: "edit-user/:id",
  editBlog: "edit-blog/:slug",
  post: "/post/:slug"
  
} as const;
