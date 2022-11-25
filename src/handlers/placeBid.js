const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function placeBid(req) {

  const { id } = req.pathParameters;
  const { amount } = JSON.parse(req.body);
  const params = {
    TableName: 'AuctionsTable',
    Key : {id},
    UpdateExpression : 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount' : amount
    },
    ReturnValues : 'ALL_NEW'
  }

  let updatedAuction;
  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }


  return{
    statusCode : 200,
    body : JSON.stringify(updatedAuction)
  }
}

module.exports.handler = placeBid;