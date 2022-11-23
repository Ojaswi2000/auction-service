const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function getAuction(req) {

  let auction;
  const { id } = req.pathParameters;
  try {
    const result = await dynamodb.get({
      TableName : 'AuctionsTable',
      Key : {id}
    })
    auction = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }


  if(!auction){
    throw new createError.NotFound(`Auction with ID ${id} not found`);
  }
  return{
    statusCode : 200,
    body : JSON.stringify(auction)
  }
}

module.exports.handler = getAuction