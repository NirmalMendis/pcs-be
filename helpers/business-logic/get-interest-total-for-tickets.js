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

  return parseFloat(totalInterest.toFixed(2));
};

module.exports = getTotalInterestForTickets;
