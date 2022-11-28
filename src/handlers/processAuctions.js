const { getEndedAuctions } = require('../lib/getEndedAuctions');
const { closeAuction } = require('../lib/closeAuction');

async function processauctions(){
  const auctionsToClose = await getEndedAuctions();
  const closedPromises = auctionsToClose.map(auction => closeAuction(auction.id));
  Promise.all(closedPromises);
}

module.exports.handler = processauctions;