export default [
  {
    url: "/api/rxjs",
    type: "get",
    response: (options) => {
      return {
        text: "Debounce Time 500 ms !",
      };
    },
  },
];
