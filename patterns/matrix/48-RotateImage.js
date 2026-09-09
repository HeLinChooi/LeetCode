// LC 48 — Rotate Image                                    [hint, O(n^2), O(1)]
//
// Pattern: IN PLACE, EVERY WRITE DESTROYS THE THING YOU NEED NEXT.
//
// Clockwise by 90 degrees is the mapping (r, c) -> (c, n - 1 - r). Follow it
// from any cell and you are back where you started after exactly four steps, so
// every cell sits in a cycle of four and one cycle is four writes.
//
// The bug that cost the solve: reading the value to move from the matrix at the
// top of each step. In place there is no spare room, so the write in step k
// lands on a cell nobody has moved yet, and that evicted value is precisely what
// step k+1 must write. Re-reading gives back what you just wrote. Traced on the
// 3x3, the wrong version picks up 1 four times and smears it round the ring:
//
//     [[1,2,1],[4,5,6],[1,8,1]]
//
// So the value being moved lives in nextVal, read once BEFORE the loop and
// carried across iterations. The give-away beforehand was an unused variable —
// the evicted value was computed and never read. Same tell as 543.
//
// Second half: visit each cycle once, not four times. The representatives are
// the top row of each ring without its last cell, because that last cell is
// where the ring's first cell travels to.
//
//     n = 3:  (0,0) (0,1)
//     n = 4:  (0,0) (0,1) (0,2) (1,1)
//     n = 5:  (0,0) (0,1) (0,2) (0,3) (1,1) (1,2)
//
// O(n^2) time, O(1) space, which is optimal — every cell has to move.
// Verified on n = 1..20 and 2000 random matrices against an out-of-place rotate.
//
// PREFER THE OTHER VERSION. See rotateByTranspose below: same bounds, one index
// expression instead of five. When two solutions share a complexity, the one
// with fewer chances to be wrong is the better answer.

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;

    for (let ring = 0; ring < Math.floor(n / 2); ring++) {
        for (let start = ring; start <= n - 2 - ring; start++) {
            let r = ring, c = start;
            let carried = matrix[r][c];          // read ONCE, outside the cycle

            for (let i = 0; i < 4; i++) {
                const nr = c, nc = n - 1 - r;    // both from the OLD pair
                const evicted = matrix[nr][nc];
                matrix[nr][nc] = carried;
                carried = evicted;               // what the next write needs
                r = nr;
                c = nc;
            }
        }
    }
};

// The version to write in an interview. Transposing swaps (r, c) with (c, r),
// which turns rows into columns; reversing each row then flips the order, and
// the two together are a clockwise rotation.
//
//   1 2 3      transpose      1 4 7      reverse rows      7 4 1
//   4 5 6       ------->      2 5 8       --------->       8 5 2
//   7 8 9                     3 6 9                        9 6 3
//
// c = r + 1 is the only index subtlety: starting at r would swap every pair
// twice and undo the transpose.
var rotateByTranspose = function(matrix) {
    const n = matrix.length;
    for (let r = 0; r < n; r++) {
        for (let c = r + 1; c < n; c++) {
            [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
        }
    }
    for (const row of matrix) row.reverse();
};
