 import {v4 as uuid} from 'uuid'
 
 async function createAuction(req) {

  const { title } = JSON.parse(req.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  }

  return {
    "statusCode": 201,
    "body": JSON.stringify(auction)
  };

};

module.exports.handler = createAuction;
