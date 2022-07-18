"use strict";

/**
 * line service.
 */

const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

module.exports = {
  async followEvent(event) {
    if (!event?.source?.userId) return;

    try {
      const data = {
        data: { user_id: event.source.userId },
      };
      const entity = await strapi.entityService.create(
        "api::line-user.line-user",
        data
      );

      const message = {
        type: "text",
        text: "友達登録ありがとうございます！",
      };
      client.replyMessage(event.replyToken, message);
    } catch (error) {
      strapi.log.error(error);
      const message = {
        type: "text",
        text: "正常にユーザーが登録されませんでした。\nブロック後フォローし直してください。\n何度も失敗する場合は管理者へお問い合わせください。",
      };
      client.replyMessage(event.replyToken, message);
    }
  },

  async unfollowEvent(event) {
    if (!event?.source?.userId) return;

    try {
      await strapi
        .query("api::line-user.line-user")
        .delete({ where: { user_id: event.source.userId } });
    } catch (error) {
      strapi.log.error(error);
    }
  },
};
