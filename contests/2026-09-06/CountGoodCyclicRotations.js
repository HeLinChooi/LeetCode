// Q2 — Count Good Cyclic Rotations
//
// Pattern: sliding window on a circular array + a conserved quantity.
//
// The total S = firstHalf + secondHalf is the same for every rotation, so
// "firstHalf > secondHalf" is just "2 * firstHalf > S". One window to
// maintain instead of two.
//
// Sums fit in a double: 1e5 * 1e9 = 1e14 < 2^53. No BigInt needed.
//
// O(n) time, O(1) space.

/**
 * @param {number[]} nums
 * @return {number}
 */
var countGoodRotations = function (nums) {
    const n = nums.length;
    const half = n / 2;

    let total = 0;
    for (let i = 0; i < n; i++) total += nums[i];

    let window = 0;
    for (let i = 0; i < half; i++) window += nums[i];

    let ret = 0;
    for (let start = 0; start < n; start++) {
        if (2 * window > total) ret++;
        window = window - nums[start] + nums[(start + half) % n];
    }
    return ret;
};
