 async function createAuction(event) {

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  }

  return {
    "statusCode": 200,
    "body": JSON.stringify(event)
  };

};

module.exports.handler = createAuction;
