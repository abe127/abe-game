"use strict";

/**
 *  room controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::room.room", ({ strapi }) => ({
  async join(ctx) {
    const { id } = ctx.params;

    // ユーザーのプロフィールを取得
    const idToken = await strapi
      .service("api::line.line")
      .getIdToken(ctx.request.body.id_token, ctx.request.body.client_id);
    const user_id = idToken.data.sub;

    const data = {
      room: id,
    };
    const user_result = await strapi
      .query("api::line-user.line-user")
      .update({ where: { user_id: user_id }, data: data });

    console.log(id);
    const roomInfo = await strapi
      .query("api::room.room")
      .findOne({ where: { id } });

    const message = {
      type: "text",
      text: `${roomInfo.name} に参加しました！`,
    };
    await strapi.service("api::line.line").sendPushMessage(user_id, message);

    return roomInfo;
  },
}));
