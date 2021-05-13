#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int, int> ii;
typedef vector<int> vi;
typedef vector<ii> vii;
#define debug(x) cout << #x << " is " << x << endl
#define endl '\n'

enum { UNVISITED = -1, EXPLORED = -2, VISITED = -3 };

class Solution {
   public:
    bool canFinish(int numCourses, vector<vector<int>> &prerequisites) {
        // construct Adjacency list
        vector<vii> AL;
        AL.assign(numCourses, vii());
        vi dfs_num;
        vi dfs_parent;
        dfs_num.assign(numCourses, UNVISITED);
        dfs_parent.assign(numCourses, -1);
        for (int i = 0; i < prerequisites.size(); i++) {
            // weight is 0
            AL[prerequisites[i][1]].emplace_back(prerequisites[i][0], 0);
        }
        for (int i = 0; i < numCourses; i++) {
            if (dfs_num[i] == UNVISITED) {
                if (cycleCheck(i, AL, dfs_num, dfs_parent)) {
                    return false;
                };
            }
        }
        return true;
    }

    bool cycleCheck(int u, vector<vii> &AL, vi &dfs_num, vi &dfs_parent) {
        dfs_num[u] = EXPLORED;
        if (u < AL.size()) {
            for (auto &pair : AL[u]) {
                int v = pair.first;
                auto w = pair.second;

                if (dfs_num[v] == UNVISITED) {
                    dfs_parent[v] = u;
                    bool ret = cycleCheck(v, AL, dfs_num, dfs_parent);
                    if(ret){
                        // dfs_num[u] = VISITED;
                        return ret;
                    }else{
                        continue;
                    }
                } else if (dfs_num[v] == EXPLORED) {
                    // if (v == dfs_parent[u])  // differentiate them
                    //     printf(" Bidirectional Edge (%d, %d)-(%d, %d)\n", u,
                    //     v, v,u);
                    // else
                    //     printf("Back Edge (%d, %d) (Cycle)\n", u, v);
                    return true;
                } else if (dfs_num[v] == VISITED) {
                    // printf("Forward/Cross Edge (%d, %d)\n", u, v);
                    // return true;
                }
            }
        }
        dfs_num[u] = VISITED;
        return false;
    }
};
int main() {
    cout << "main starts\n";
    Solution test;
    // vector<int> temp{1, 0};
    // vector<int> temp2{0, 1};
    // vector<int> temp{1, 4};
    // vector<int> temp2{2, 4};
    // vector<vector<int>> prerequisite{temp, temp2};
    // vector<vector<int>> prerequisite{{1,4},{2,4},{3,1},{3,2}};
    vector<vector<int>> prerequisite{{1,0},{2,0},{0,2}};
    cout << test.canFinish(5, prerequisite) << "\n";
    // Solution1 s;
    // cout << s.getTrue();
    cout << "main ends";
    int a;
    cin >> a;
    return 0;
};