// LC 54 — Spiral Matrix                                       [hint, 67m, O(1)]
//
// Pattern: SHRINK THE REGION instead of marking what you visited.
//
// The first two attempts marked cells in a `seen` grid and turned right when the
// next step was off the grid or already visited. That is a real accepted
// solution and the idea was correct at minute one. All 67 minutes went into
// bookkeeping, because that version has to keep four things consistent — the
// cursor, the direction, the `seen` grid and the count — and both bugs were two
// of them disagreeing:
//
//   1. A pass can end by running off the edge OR by hitting a seen cell, and
//      those leave the cursor in different places. The same fixed adjustment was
//      applied to both, so the second lap started on the outer ring. The 3x3
//      lost its centre; every single-row grid looped forever.
//   2. Bounds were then checked in the loop condition AND in the helper. The
//      loop condition ran first, so the pass exited by its own test and the
//      helper's turn never happened. Fixed by `while (true)` — deleting one of
//      the two checks, not making them agree.
//
// This version is the other standard answer. The unvisited part of the matrix is
// always a rectangle, and a rectangle is four numbers. Walk the top row, then
// that row is gone, so top++. Nothing is marked because nothing needs to be.
//
// Each variable has a meaning you can say out loud — `top` is the first row not
// yet walked — so a wrong value is visible on inspection rather than three
// passes later.
//
// The two `if` guards are the whole edge case. In a 1x5 grid the top pass takes
// all five cells and top becomes 1, so nothing is left; without
// `if (top <= bottom)` the bottom pass walks that same row backwards and emits
// four values a second time.
//
// O(m*n) time, O(1) extra space. The `seen` version is O(m*n) space.
// Verified against the seen-grid version on every shape from 1x1 to 12x12.

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const ret = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) ret.push(matrix[top][c]);
        top++;

        for (let r = top; r <= bottom; r++) ret.push(matrix[r][right]);
        right--;

        if (top <= bottom) {                       // a row is still left
            for (let c = right; c >= left; c--) ret.push(matrix[bottom][c]);
            bottom--;
        }
        if (left <= right) {                       // a column is still left
            for (let r = bottom; r >= top; r--) ret.push(matrix[r][left]);
            left++;
        }
    }
    return ret;
};
