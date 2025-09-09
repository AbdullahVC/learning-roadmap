"use strict";
//data:
//initial amount
//annual contribution
//expected return
//duration
function calculateInvestment(data) {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount <= 0) {
        return "Initial amount must be greater than 0";
    }
    if (duration <= 0) {
        return "Duration must be greater than 0";
    }
    if (expectedReturn < 0) {
        return "Expected return must be greater than or equal to 0";
    }
    let total = initialAmount;
    let totalContribution = 0;
    let totalInterestEarned = 0;
    const annualResults = [];
    for (let i = 1; i < duration; i++) {
        total = total * (1 + expectedReturn);
        totalInterestEarned = total - initialAmount - totalContribution;
        totalContribution += annualContribution;
        total += annualContribution;
        annualResults.push({
            year: `Year ${i}`,
            totalAmount: total,
            totalInterestEarned,
            totalContribution,
        });
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results === "string") {
        console.log(results);
        return;
    }
    for (const yearEndResult of results) {
        console.log(`${yearEndResult.year}\t${yearEndResult.totalAmount}\t${yearEndResult.totalContribution}\t${yearEndResult.totalInterestEarned}`);
    }
}
const investmentData = {
    initialAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.08,
    duration: 10,
};
const results = calculateInvestment(investmentData);
printResults(results);
//# sourceMappingURL=calculator.js.map