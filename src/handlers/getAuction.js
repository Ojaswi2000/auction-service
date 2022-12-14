const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getAuctionById = async(id) => {
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
    return{
      statusCode : 404,
      Message : `Auction with ID ${id} not found`
    }
  }
  return auction;
}

async function getAuction(req) {
  const { id } = req.pathParameters;
  const auction = await getAuctionById(id);
  return{
    statusCode : 200,
    body : JSON.stringify(auction)
  }
}

module.exports.handler = getAuction
