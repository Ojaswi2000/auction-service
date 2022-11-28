const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getEndedAuctions = async() => {
  const now = new Date();
  const params = {
    TableName: 'AuctionsTable',
    IndexName: 'statusAndEndDate',
    KeyConditionExpression : '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status' : 'OPEN',
      ':now' : now.toISOString(),
    },
    ExpressionAttributeNames:{
      '#status' : 'status'
    }
  }
}