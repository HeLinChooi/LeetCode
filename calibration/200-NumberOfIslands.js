// LC 200 — Number of Islands                            [45m, three attempts]
//
// Pattern: a grid is a graph. Cells are nodes, side-adjacency is an edge, and
// "count the islands" is "count the connected components". What the eye does
// looking at the picture is flood fill.
//
// Why counting DFS starts is correct: every land cell belongs to exactly one
// island; a DFS from a land cell visits exactly that island; the outer scan
// starts a DFS only at an unmarked land cell. So it starts one DFS per island.
//
// All three failed attempts were in the marking, never in the idea:
//   1. `new Array(rows).fill([])` gave every row the SAME array — fill copies a
//      reference, so one mark marked every row.
//   2. The visited flag was read but never written. Infinite recursion.
//   3. The mark was written at the CALL SITE while the check lived at the top
//      of the callee, so every recursive call marked its target and then hit
//      "already marked, go away". The recursion never passed depth one.
//
// The rule those three add up to: a check and the state it guards belong in
// the same place. If a recursive call is wrapped in an `if`, the `if` is in
// the wrong function.
//
// Caveat on the accepted solution: the constraints allow 300x300, so an
// all-land grid recurses 90,000 frames deep and throws RangeError. It passes
// because no such test case exists. An explicit stack or a BFS queue is the
// version that actually honours the constraints.

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));

    // Bounds, visited and water all rejected here, so no call site needs an if.
    const dfs = (r, c) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (seen[r][c] || grid[r][c] === "0") return;
        seen[r][c] = true;
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    };

    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!seen[r][c] && grid[r][c] === "1") { dfs(r, c); count++; }
        }
    }
    return count;
};
