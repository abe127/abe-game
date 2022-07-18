"use strict";

/**
 * A set of functions called "actions" for `line`
 */

module.exports = {
  webhook: async (ctx, next) => {
    strapi.log.info("/line/webhook", JSON.stringify(ctx.request));

    try {
      ctx.request.body.events.forEach((event) => {
        const eventType = event.type;

        switch (eventType) {
          case "follow":
            strapi.service("api::line.line").followEvent(event);
            break;
          case "unfollow":
            strapi.service("api::line.line").unfollowEvent(event);
            break;
          default:
            strapi.log.info("Not processing.");
        }
      });
    } catch (err) {
      strapi.log.error(err);
    }

    ctx.body = 200;
  },
};
