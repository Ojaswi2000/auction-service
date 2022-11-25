 const uuid = require('uuid');
 const AWS = require('aws-sdk');
//  const middy = require('@middy/core');
//  const httpEventNormalizer = require('@middy/http-event-normalizer');
//  const httpErrorHandler = require('@middy/http-error-handler');
//  const httpJsonBodyParser = require('@middy/http-json-body-parser');
 const {createError} = require('http-errors');
 
 const dynamodb = new AWS.DynamoDB.DocumentClient();
 async function createAuction(req) {

  const { title } = JSON.parse(req.body);
  const now = new Date();

  const auction = {
    id: uuid.v4(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    highestBid: {
      amount : 0
    }
  }

  try {
      await dynamodb.put({
      TableName: 'AuctionsTable',
      Item: auction
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }



  return {
    "statusCode": 201,
    "body": JSON.stringify(auction)
  };

};

module.exports.handler = createAuction
// module.exports.handler = middy(createAuction)
// .use(httpJsonBodyParser())
// .use(httpEventNormalizer())
// .use(httpErrorHandler())
