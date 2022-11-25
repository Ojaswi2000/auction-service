const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id)
{
  let auction;
  try {
    const result = await dynamodb.get({
      TableName : 'AuctionsTable',
      Key : {id}
    }).promise()
    auction = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  if(!auction){
    throw new createError.NotFound(`Auction with ID ${id} not found`);
  }
  return auction;
}

async function getAuction(req) {
  const { id } = req.pathParameters;
  const auction = getAuctionById(id);
  return{
    statusCode : 200,
    body : JSON.stringify(auction)
  }
}

module.exports.handler = getAuction