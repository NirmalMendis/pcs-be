/**
 *
 * @param {Array} tickets
 *  @returns {number}
 */
const getTotalInterestForTickets = (tickets) => {
  let totalInterest = 0;

  tickets.forEach((pawnTicket) => {
    pawnTicket.interests.forEach((interest) => {
      totalInterest += interest.amount;
    });
  });

  // round to 2 decimal places
  return parseFloat(totalInterest.toFixed(2));
};

module.exports = getTotalInterestForTickets;
