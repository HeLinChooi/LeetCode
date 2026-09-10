// LC 167 — Two Sum II (Input Array Is Sorted)      [messy, 34m, O(n^2) → O(n)]
//
// Pattern: SORTED ARRAYS LET YOU ELIMINATE, NOT JUST LOOK UP.
//
// The first submission was a nested loop and it TLE'd. The fix that got it
// accepted was a skip on the outer loop, and it worked by accident:
//
//     if (checking === undefined) checking = first;   // runs once, at start = 0
//     else if (checking === first) continue;
//
// `checking` is assigned on the first iteration and never again, so the skip
// only ever fires for duplicates of numbers[0]. A run of duplicates later in
// the array is not skipped at all. The submission passed because the test set
// happened to have its duplicates at the front.
//
// The word "Sorted" is in the problem title and it was not used. That is the
// whole failure — not the loop, the reading. Every constraint in a statement is
// there to permit something; ask what, before writing code.
//
// The elimination argument: numbers[hi] is the LARGEST value left. If
// numbers[lo] + numbers[hi] is still below the target, then numbers[lo] plus
// anything smaller is also below it, so numbers[lo] cannot appear in any
// answer at all. Discard it forever. Mirrored for hi when the sum is too big.
// Each step retires one element, so the loop runs at most n times.
//
// This is the identical argument already written up for 15 3Sum and used again
// in 11 seventeen minutes later. It did not fire here because the array arrived
// sorted instead of being sorted by hand — the sort was the cue, not the order.
//
// O(n) time, O(1) space.

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let lo = 0, hi = numbers.length - 1;

    while (lo < hi) {
        const sum = numbers[lo] + numbers[hi];
        if (sum === target) return [lo + 1, hi + 1];   // 1-indexed answer
        if (sum < target) lo++;                        // lo can never be in a pair
        else hi--;                                     // hi can never be in a pair
    }
    return [-1, -1];                                   // unreachable: LC guarantees one solution
};
