module.exports = {
  routes: [
    {
      method: "POST",
      path: "/line/webhook",
      handler: "line.webhook",
      config: {
        policies: ["validate-signature"],
        middlewares: [],
      },
    },
  ],
};
