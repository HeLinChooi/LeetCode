// LC 560 — Subarray Sum Equals K                          [clean (n^2) → O(n)]
//
// Pattern: FIX THE END, then ask which start you need.
//
// The first solve built the prefix sums, then peeled one element off the front
// at a time and re-checked every suffix. Correct, and O(n^2) — the second time
// after 347 that the answer was right and the bound was not. Both times the
// complexity was never named before the code was written.
//
// The turn that removes the outer loop: a subarray ending at j is the whole
// prefix up to j with a front piece cut off, so its sum is prefix[j] - prefix[i]
// for some earlier i. Setting that equal to k gives
//
//     prefix[i] === prefix[j] - k
//
// which says the front piece you must discard has a KNOWN sum. So you stop
// searching for the start and look it up. Every candidate front piece is
// nums[0..i], whose sum is an earlier prefix sum — exactly what the map holds.
//
// The map stores COUNTS, not positions: two earlier indices can share a prefix
// sum, and each one is a separate subarray ending here. Positions would be
// needed only for a longest/shortest question (525), not a how-many one.
//
// No sliding window here. A window needs growing it to only increase the sum,
// so that "too big" means shrink. nums may be negative, so nothing is monotonic
// and there is no shrink rule. Negative values in a subarray-sum problem are the
// trigger for prefix-plus-map instead of a window.
//
// Same three lines solve 974 (key: prefix mod k), 930 (key: count of ones) and
// 1248 (key: count of odds). Only the definition of "prefix" moves.
//
// O(n) time, O(n) space.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    const seen = new Map();   // <prefix sum, how many times it has occurred>
    seen.set(0, 1);           // if not deleting any front prefix: sum 0, seen once
    let prefix = 0;
    let ret = 0;
    for (const num of nums) {
        prefix += num;
        ret += seen.get(prefix - k) || 0;
        seen.set(prefix, (seen.get(prefix) || 0) + 1);
    }
    return ret;
};
