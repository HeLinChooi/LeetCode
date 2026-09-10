// LC 121 — Best Time to Buy and Sell Stock                  [hint, 27m, O(n)]
//
// Pattern: FIX THE END, THEN ASK WHICH START YOU NEED.
//
// The hint that unlocked it, from Gemini: "at any given point of time to sell,
// we need to know a value to decide the best time to buy."
//
// That sentence is already a section heading in algorithm-patterns.md, written
// up from LC 560 four days earlier, and 121 is named in a second section
// (Combine a sweep from the left with a sweep from the right) as "the same idea
// with only the left sweep needed". The pattern file contained the answer twice
// and it was not reached for. That is the finding of this problem — not the
// technique, the retrieval.
//
// The brute force picks a buy day and tries every sell day after it: O(n^2).
// Turning it around, walk the SELL day forward and ask what the best buy day
// would have been. That buy day is any day strictly before, and the best one is
// the cheapest one, which is a single running minimum. Two loops become one.
//
// Same three-line shape as 560. Only the definition of "what I carry from the
// left" changes: a map of prefix sums there, one minimum here.
//
// O(n) time, O(1) space.
//
// Two notes on the submitted version, neither a bug:
//   - the approach comment said "O(2) extra space". Two variables is O(1);
//     a constant count of variables never appears in the bound.
//   - `if (curPrice - minPrice > 0)` is not needed. `best` starts at 0 and
//     Math.max already discards anything smaller, which is the same statement
//     as "a loss is never taken, so profit cannot go below zero".

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = prices[0];   // cheapest day strictly before today
    let best = 0;               // 0 = do not trade at all

    for (let i = 1; i < prices.length; i++) {
        best = Math.max(best, prices[i] - minPrice);   // sell today, having bought at the minimum
        minPrice = Math.min(minPrice, prices[i]);      // update AFTER, so it stays "strictly before"
    }
    return best;
};
