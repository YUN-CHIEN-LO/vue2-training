export default [
  {
    url: "/mock/api/account/info",
    type: "get",
    response: () => {
      return {
        AccountID: "@word",
        Committed: "@word",
        Company: "@name",
        Name: "@name",
        PhotoURL: "https://cdn.vuetifyjs.com/images/john.jpg",
      };
    },
  },
];
