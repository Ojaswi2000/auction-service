const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function placeBid(req) {

  const { id } = req.pathParameters;
  const { amount } = JSON.parse(req.body);




  return{
    statusCode : 200,
    body : JSON.stringify(auction)
  }
}

module.exports.handler = placeBid;