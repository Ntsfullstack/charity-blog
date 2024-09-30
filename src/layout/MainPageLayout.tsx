// import React from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import styles from "./HomeLayout.module.scss";
// // import SideChildPage2 from "../components/SiderChildPage2/SideChildPage2";
// import Banner from "../components/banner/Banner";
// import MainPage from "../pages/main_page/screen/MainPage";
// import Header from "../components/header/Header";

// const PageChildLayout2 = () => {
//   const location = useLocation();
//   console.log(location, location.pathname);

//   const categories = [
//     {
//       name: "TIN TỨC - SỰ KIỆN",
//       path: "/MainPage",
//     },
//     {
//       name: "TRUYỀN THÔNG BÁO CHÍ",
//       path: "/thong-cao-bao-chi",
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <Banner />
//       <div className={styles.mainContent}>
//         {/* <SideChildPage2 categories={categories} /> */}
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default PageChildLayout2;
