#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

class Solution {
   public:
    bool isBipartite(vector<vector<int>>& graph) {
        // definition of each integer
        // not coloured = 0, group 1 = 1, group 2 = -1
        int n = graph.size();
        vector<int> grp(n);
        for (int i = 0; i < n; i++) {
            if (grp[i] == 0 && !dfs(grp, graph, i, 1)) return false;
        }
        return true;
    }
    // group = the integer that assigned to this idx
    bool dfs(vector<int>& grp, vector<vector<int>>& graph, int idx, int group) {
        grp[idx] = group;
        for (int i = 0; i < graph[idx].size(); i++) {
            int nextIdx = graph[idx][i];
            // diff color
            if (grp[nextIdx] == group) return false;
            if (grp[nextIdx] == 0 && !dfs(grp, graph, nextIdx, -group)) return false;
        }
        return true;
    }
};