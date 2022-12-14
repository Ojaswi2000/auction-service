const { getEndedAuctions } = require('../lib/getEndedAuctions');
const { closeAuction } = require('../lib/closeAuction');
const createError = require('http-errors')

async function processAuctions(){

  try {
    const auctionsToClose = await getEndedAuctions();
    const closedPromises = auctionsToClose.map(auction => closeAuction(auction));
    await Promise.all(closedPromises);
    return {closed : closedPromises.length}    
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

}

module.exports.handler = processAuctions;