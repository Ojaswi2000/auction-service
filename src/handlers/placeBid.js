const AWS = require('aws-sdk');
const createError = require('http-errors');
const {getAuctionById} = require('./getAuction');

const dynamodb = new AWS.DynamoDB.DocumentClient();
async function placeBid(req) {

  const { id } = req.pathParameters;
  const { amount } = JSON.parse(req.body);
  const auction = await getAuctionById(id);
  if(auction.status !== 'OPEN')
  {
    return{
      errorCode: 404,
      errorMessage : "You cannot place bid on Closed auctions"
    }
    // throw new createError.Forbidden("You cannot place bid on Closed auctions")
  }

  if(amount <= auction.highestBid.amount)
  {
    return{
      statusCode : 400,
      body : `Your Bid Must Be Higher than ${auction.highestBid.amount}`
    }
  }

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