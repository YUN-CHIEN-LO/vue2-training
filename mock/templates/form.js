// 變數方法
import { rand } from "@/utils/index";
export default [
  {
    url: "/api/form/info",
    type: "get",
    response: (options) => {
      const params = JSON.parse(options.query.info);
      return {
        Name: params.name,
        Email: params.email,
        Color: params.select,
        PhotoURL: `https://picsum.photos/40?v=${rand(111, 999)}`,
      };
    },
  },
];
