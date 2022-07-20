module.exports = {
  routes: [
    {
      method: "POST",
      path: "/rooms/:id/join",
      handler: "room.join",
    },
  ],
};
