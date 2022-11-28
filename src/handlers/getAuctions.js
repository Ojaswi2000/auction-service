const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function getAuctions(req) {

  const { status } = req.queryStringParameters;
  const params = {
    TableName: 'AuctionsTable',
    IndexName : 'statusAndEndDate',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues : {
      ':status' : status
    },
    ExpressionAttributeNames :{
      '#status' : 'status'
    }
  }


  let auctions;
  try {
    const result = await dynamodb.query(params).promise();
    auctions = result.Items
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