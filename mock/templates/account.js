// 變數方法
import { rand } from "@/utils/index";
export default [
  {
    url: "/api/account/info",
    type: "get",
    response: () => {
      return {
        "Role|1": ["admin", "member", "user"],
        // Role: "admin",
        AccountID: "@word",
        Committed: "@word",
        Company: "@name",
        Name: "@name",
        Email: "@email",
        "Color|1": ["Red", "Yellow", "Green", "Blue", "Purple"],
        PhotoURL: `https://picsum.photos/40?v=${rand(111, 999)}`,
      };
    },
  },
];
