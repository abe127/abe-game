'use strict';

/**
 * line-user service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::line-user.line-user');
