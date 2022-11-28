const { getEndedAuctions } = require('../lib/getEndedAuctions');

async function processauctions(){
  const auctionsToClose = await getEndedAuctions();
  console.log(auctionsToClose);
}

module.exports.handler = processauctions;