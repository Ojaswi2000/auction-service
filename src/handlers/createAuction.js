 import {v4 as uuid} from 'uuid'
 import AWS from 'aws-sdk'
 
 const dynamodb = AWS.DynamoDB.DocumentClient();
 async function createAuction(req) {

  const { title } = JSON.parse(req.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  }

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction
  }).promise();

  return {
    "statusCode": 201,
    "body": JSON.stringify(auction)
  };

};

module.exports.handler = createAuction;
