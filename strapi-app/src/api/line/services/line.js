"use strict";

/**
 * line service.
 */

const axios = require("axios");
const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

module.exports = {
  async followEvent(event) {
    if (!event?.source?.userId) return;

    try {
      const data = {
        data: { user_id: event.source.userId , context: 'name_setting', },
      };
      const entity = await strapi.entityService.create(
        "api::line-user.line-user",
        data
      );
      const message = {
        type: "text",
        text: "友達登録ありがとうございます！\nゲームで使用する名前を送ってください。\n※10文字以内、11文字以上は切り捨て",
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

  async messagingEvent(event) {
    if (!event?.source?.userId) return;
    try {
      const context = await strapi
                  .query("api::line-user.line-user")
                  .findOne({select: ['context'], where: { user_id: event.source.userId }});
      if(context.context === 'name_setting'){
        const text = event.message.text;
        const display_name = text.length < 11 ? text : text.substr(0, 10);
        await strapi
          .query("api::line-user.line-user")
          .update({ where: { user_id: event.source.userId } , data: {display_name: display_name, context: 'done'}});
        const message = {
          type: "text",
          text: `${display_name}　に設定しました！`,
        };
        client.replyMessage(event.replyToken, message);
      }

    } catch (error) {
      strapi.log.error(error);
    }
  },

  async getIdToken(id_token, client_id) {
    try {
      const body = new URLSearchParams();
      body.append("id_token", id_token);
      body.append("client_id", client_id);
      const result = await axios.post(
        "https://api.line.me/oauth2/v2.1/verify",
        body,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async sendPushMessage(to, messages, notificationDisabled = false) {
    client.pushMessage(to, messages, notificationDisabled).catch((error) => {
      console.log(error);
    });
  },

};
