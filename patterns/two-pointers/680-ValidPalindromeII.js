// LC 680 — Valid Palindrome II                             [messy, 20m, O(n)]
//
// Pattern: WHEN A CHOICE HAS TWO OPTIONS AND NEITHER CAN BE RULED OUT, CHECK
// BOTH. Do not guess and then build machinery to recover from a wrong guess.
//
// The first submission guessed which side to delete and failed on "eceec". The
// accepted version kept the guess and added a saved restart point:
//
//     let oneChance, useOneChance, oneChanceStart, oneChanceEnd;
//
// That version IS correct — verified against a reference on all 5325 strings
// over {a,b} up to length 10 and {a,b,c} up to length 7, zero mismatches. The
// reasoning behind it is also sound: when only one side matches, the other side
// provably fails immediately, so the guess is forced; the restart point is only
// needed when both sides match. And one saved restart is enough, because only
// one deletion is allowed, so there is only ever one decision point.
//
// It is still the wrong solution, because all of that reasoning is the price of
// insisting on a guess. There are exactly two candidates at a mismatch: delete
// the left character, or delete the right one. Checking both costs one extra
// linear scan and deletes the entire argument above.
//
// Complexity is still O(n), which is the part that looks wrong and is not. The
// main loop reaches the mismatch branch at most once, because that branch
// returns. So the two helper calls happen once between them, not once per
// character: n/2 comparisons plus at most two O(n) scans.
//
// The general shape, for later: when a greedy step has k options and no cheap
// way to tell which is right, and the work after the step is linear, just run
// all k. That is the boundary between greedy and brute force, and at k = 2 it
// is not a real cost.
//
// The miss that produced "eceec" was not the algorithm, it was not generating
// the input. The code has a branch for "both sides match"; the test case is
// read straight off that branch. See the edge-case checklist in
// knowledge-base/docs/interviews/algorithm-patterns.md.
//
// O(n) time, O(1) space.

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    let lo = 0, hi = s.length - 1;

    while (lo < hi) {
        if (s[lo] !== s[hi]) {
            // Two candidates, no cheap way to choose. Run both.
            return isPalindrome(s, lo + 1, hi) || isPalindrome(s, lo, hi - 1);
        }
        lo++;
        hi--;
    }
    return true;
};

function isPalindrome(s, i, j) {
    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
}
