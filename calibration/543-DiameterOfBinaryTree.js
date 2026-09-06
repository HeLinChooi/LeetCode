// LC 543 — Diameter of Binary Tree
//
// Pattern: return one thing, accumulate another.
//
// Two different numbers are live at every node. The parent needs this node's
// depth. The answer needs leftDepth + rightDepth, the longest path peaking
// here. Only one can be returned, so the recursion returns the caller's
// number and the answer accumulates in a closure variable on the way past.
//
// Two traps this problem sets:
//   - The best path need not pass through the root. If the answer is whatever
//     the top-level call returns, paths peaking mid-tree can never be reported.
//   - Edges, not nodes. Returning a node count (null = 0, leaf = 1) makes
//     `left + right` already an edge count, which avoids the -1 base case.
//
// `best` is declared inside the function on purpose: LeetCode runs every test
// case in one process, so a module-scope accumulator carries case 1's answer
// into case 2.

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let best = 0;

    const height = (node) => {
        if (!node) return 0;
        const left = height(node.left);
        const right = height(node.right);
        best = Math.max(best, left + right);
        return 1 + Math.max(left, right);
    };

    height(root);
    return best;
};
