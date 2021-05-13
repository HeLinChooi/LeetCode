/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
#include <bits/stdc++.h>
using namespace std;
// class Solution {
// public:
//     int maxDepth(TreeNode* root) {
//         int maxD = 1;
//         int level = 1;
//         stack<pair<TreeNode*,int>> q;
//         q.push(make_pair(root,level));
//         while(!q.empty()){
//           pair<TreeNode,int> t = q.pop();
//           cout << (t.first).val << "\n";
//           if((t.first).right != null){
//             q.push(make_pair((t.first)->right, level));
//           }
//           if((t.first).left != null){
//             q.push(make_pair((t.first)->left));
//           }
//         }
//           // q.push(t.right);
//           return maxD;
//     }
// };
// code from rajneesh44
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(!root)
            return 0;
        int lmax = maxDepth(root->left);
        int rmax = maxDepth(root->right);
        return 1 + max(lmax, rmax);
    }
};