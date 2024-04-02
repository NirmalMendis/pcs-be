/**
 *
 * @param {number} principalAmount
 * @param {number} interestRate
 *  @returns {number}
 */
const calculateMonthlyInterestFn = (principalAmount, interestRate) => {
  return (principalAmount * interestRate) / 100;
};

module.exports = calculateMonthlyInterestFn;
