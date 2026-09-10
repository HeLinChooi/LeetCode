// LC 11 — Container With Most Water                        [clean, 17m, O(n)]
//
// Pattern: SORTED ARRAYS LET YOU ELIMINATE — here the "order" is height, not
// position, and there is nothing to sort. Same argument, different surface.
//
// Solved unaided in 17 minutes, and this is the reference solution. Nothing to
// fix. What is worth recording is the justification, because the approach
// comment written before coding ended with "this feels like greedy" — the right
// instinct, one step short of the proof.
//
// The proof: the pair (lo, hi) currently under the widest span has area
// min(h[lo], h[hi]) * (hi - lo). Say h[lo] is the shorter wall. Every OTHER
// pair that still uses lo has a smaller width, and its height is still capped
// by h[lo]. So every one of them is worse than the area just measured. lo
// cannot appear in a better answer, so retire it.
//
// That is the same sentence as 167 with "sum too small" replaced by "wall too
// short": the pointer that limits the answer is the one that can be discarded.
//
// Ties (h[lo] === h[hi]) can move either pointer. Both walls are limiting, so
// both arguments apply.
//
// O(n) time, O(1) space.
//
// Two readability notes carried over from review, no behaviour change:
//   - `while (lo < hi)` says the same as `while (hi - lo >= 1)` and reads faster.
//   - the running maximum starts at 0, not -1; an area is never negative.

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let lo = 0, hi = height.length - 1;
    let best = 0;

    while (lo < hi) {
        const h = Math.min(height[lo], height[hi]);
        best = Math.max(best, h * (hi - lo));

        // Retire the shorter wall: every remaining pair using it is narrower
        // and no taller, so none of them can beat what was just measured.
        if (height[lo] < height[hi]) lo++;
        else hi--;
    }
    return best;
};
