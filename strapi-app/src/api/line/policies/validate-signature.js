"use strict";

/**
 * `validate-signature` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info("In validate-signature policy.");

  const channelSecret = process.env.CHANNEL_SECRET;
  const signature = policyContext.request.header["x-line-signature"];

  // 生のbodyを取得
  const unparsed = require("koa-body/unparsed.js");
  const body = policyContext.request.body[unparsed];
  if (!body) {
    strapi.log.info("request body dose not exist.");
    return true;
  }

  const line = require("@line/bot-sdk");
  const validSignature = line.validateSignature(body, channelSecret, signature);

  if (validSignature) {
    return true;
  }

  return false;
};
