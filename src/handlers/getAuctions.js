const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function getAuctions(req) {

  let auctions;
  try {
    
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return{
    statusCode : 200,
    body : JSON.stringify(auctions)
  }
}

module.exports.handler = getAuctions