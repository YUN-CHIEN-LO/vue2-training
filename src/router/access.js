// 選單路由
export const menuRoutes = [
  {
    path: "/form",
    name: "Form",
    component: () => import("../views/Form.vue"),
    meta: {
      title: "繼承表單元件",
      access: ["member", "user"],
      icon: "mdi-pen",
    },
  },
  {
    path: "/plugin",
    name: "Plugin",
    component: () => import("../views/Plugin.vue"),
    meta: {
      title: "Plugin 製作",
      access: ["member", "user"],
      icon: "mdi-toolbox",
    },
  },
  {
    path: "/access",
    name: "Access",
    component: () => import("../views/Access.vue"),
    redirect: "/access/user",
    meta: {
      title: "權限路由",
      access: ["member", "user"],
      icon: "mdi-key",
    },
  },
  {
    path: "/directive",
    name: "Directive",
    component: () => import("../views/Directive.vue"),
    meta: {
      title: "自定義標籤",
      access: ["member", "user"],
      icon: "mdi-tag",
    },
  },
  {
    path: "/rxjs",
    name: "Rxjs",
    component: () => import("../views/Rxjs.vue"),
    meta: {
      title: "RxJS 練習",
      access: ["member", "user"],
      icon: "mdi-alpha-r-box",
    },
  },
];

// 系統功能路由
export const systemRoutes = [
  {
    path: "/form",
    name: "Form",
    component: () => import("../views/Form.vue"),
    meta: {
      title: "繼承表單元件",
      access: ["member", "user"],
    },
  },
  {
    path: "/plugin",
    name: "Plugin",
    component: () => import("../views/Plugin.vue"),
    meta: {
      title: "Plugin 製作",
      access: ["member", "user"],
    },
  },
  {
    path: "/access",
    name: "Access",
    component: () => import("../views/Access.vue"),
    redirect: "/access/user",
    meta: {
      title: "權限路由",
      access: ["member", "user"],
    },
    children: [
      {
        path: "admin",
        name: "Admin",
        component: () => import("../views/Admin.vue"),
        meta: {
          title: "Admin 權限",
          access: ["admin"],
        },
      },
      {
        path: "member",
        name: "Member",
        component: () => import("../views/Member.vue"),
        meta: {
          title: "Member 權限",
          access: ["member"],
        },
      },
      {
        path: "user",
        name: "User",
        component: () => import("../views/User.vue"),
        meta: {
          title: "User 權限",
          access: ["member", "user"],
        },
      },
    ],
  },
  {
    path: "/directive",
    name: "Directive",
    component: () => import("../views/Directive.vue"),
    meta: {
      title: "自定義標籤",
      access: ["member", "user"],
    },
  },
  {
    path: "/rxjs",
    name: "Rxjs",
    component: () => import("../views/Rxjs.vue"),
    meta: {
      title: "RxJS 練習",
      access: ["member", "user"],
    },
  },
];

export const accessRoutes = menuRoutes.concat(systemRoutes);
