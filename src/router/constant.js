// 基礎路由
export const constantRoutes = [
  {
    // 系統轉導頁
    name: "redirect",
    path: "/redirect/:type",
    component: () => import("@/views/Redirect.vue"),
    hidden: true,
    meta: {
      title: "重導頁面",
    },
  },
  {
    // 首頁
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首頁",
    },
  },
  {
    // 錯誤提示頁
    name: "error",
    path: "/error",
    component: () => import("@/views/Error.vue"),
    props: true,
    hidden: true,
  },
  {
    // 預設查無對應網址時，進入錯誤提示頁
    path: "*",
    redirect: "/error",
    hidden: true,
  },
];
