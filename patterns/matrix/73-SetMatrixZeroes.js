// LC 73 — Set Matrix Zeroes                            [hint, O(m*n), O(m+n)]
//
// Pattern: DO NOT READ AND WRITE IN THE SAME PASS.
//
// The first attempt zeroed each row and column as it found a zero, in one pass.
// That makes the scan read its own writes: a zero it just wrote looks exactly
// like a zero from the input. The repair was an m x n `seen` grid recording
// which zeros were self-inflicted. It was correct — 5000 random matrices — and
// the judge rejects it anyway:
//
//     "You are not allowed to create an O(m*n) copy or auxiliary matrix"
//
// Splitting the passes removes the need for the guard entirely. All the reading
// finishes before any writing starts, so nothing written can be misread.
//
// The other half is WHAT to record. The instinct is which cells must become
// zero, which is m*n facts. But a cell is zeroed because of its row or its
// column, so the real information is m + n facts. For 200x200 that is 400
// booleans instead of 40,000.
//
// Time also drops. The interleaved version rescans a row and a column for every
// zero found, so an all-zero matrix costs m*n*(m+n). This is two sweeps.
//
// The approach comment written before coding already said "loop whole matrix
// once, then loop each m row + n col" — the accepted answer. The `seen` grid
// crept in during implementation. That is the lesson of the whole matrix block:
// when the code grows a structure the approach comment never mentioned, stop and
// re-read the comment.
//
// O(m*n) time, O(m+n) space. The O(1) follow-up is the same two passes with the
// marks stored in row 0 and column 0, plus one flag for whichever is overloaded.
// Not attempted yet — it is the redo.
//
// Verified on 5000 random matrices against a reference implementation.

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const rowArr = new Array(m).fill(false);
    const colArr = new Array(n).fill(false);

    for (let r = 0; r < m; r++) {                  // pass 1: read only
        for (let c = 0; c < n; c++) {
            if (matrix[r][c] === 0) {
                rowArr[r] = true;
                colArr[c] = true;
            }
        }
    }

    for (let r = 0; r < m; r++) {                  // pass 2: write only
        if (rowArr[r]) {
            for (let c = 0; c < n; c++) matrix[r][c] = 0;
        }
    }
    for (let c = 0; c < n; c++) {
        if (colArr[c]) {
            for (let r = 0; r < m; r++) matrix[r][c] = 0;
        }
    }
};
