// Q1 — Count Rotations With Exactly K Equal Adjacent Pairs
//
// Pattern: cyclic invariant. Count the property once over the whole cyclic
// array, then note each rotation is the whole minus exactly one piece.
//
// C = equal pairs over all n cyclic adjacencies (including the wrap pair).
// Rotation r is the cyclic array with the pair (r-1, r) cut out, so
//   score(r) = C - (s[r-1] === s[r] ? 1 : 0)
// Every rotation scores C or C-1. Each of the n cyclic pairs is cut by exactly
// one rotation, so C rotations cut an equal pair and n - C cut an unequal one.
//
// O(n) time, O(1) space. (Contest solution was the O(n^2) scan — correct at
// n <= 100, but the insight is the point.)

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countRotations = function (s, k) {
    const n = s.length;
    let C = 0;
    for (let i = 0; i < n; i++) if (s[i] === s[(i + 1) % n]) C++;

    if (k === C) return n - C;      // rotations that cut an unequal pair
    if (k === C - 1) return C;      // rotations that cut an equal pair
    return 0;                       // no rotation can score anything else
};
