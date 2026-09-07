// LC 1448 — Count Good Nodes in Binary Tree                    [15m, clean]
//
// Pattern: carry a constraint DOWNWARD. The opposite of 543, despite the
// identical silhouette — outer accumulator plus recursive helper.
//
// A node needs to know about its ANCESTORS, not its descendants. So the fact
// travels down as a parameter and the work happens before recursing, and the
// helper returns nothing at all: there is nothing for a parent to receive.
//
// Seeding with -Infinity rather than root.val states the base case instead of
// relying on a coincidence, and it survives a null root.

/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root) {
    let ret = 0;

    const dive = (node, max) => {
        if (!node) return;
        if (node.val >= max) ret++;          // no ancestor beat me
        const newMax = Math.max(max, node.val);
        dive(node.left, newMax);
        dive(node.right, newMax);
    };

    dive(root, -Infinity);
    return ret;
};
