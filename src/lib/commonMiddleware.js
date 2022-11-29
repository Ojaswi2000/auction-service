const middy = require('@middy/core');
const { httpErrorHandler } = require('@middy/http-error-handler')
const { httpEventNormalizer } = require('@middy/http-event-normalizer')
const { httpJsonBodyParser } = require('@middy/http-json-body-parser');


module.exports = handler => middy(handler)
  .use([
    httpJsonBodyParser,
    httpEventNormalizer,
    httpErrorHandler
  ])
