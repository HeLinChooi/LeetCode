#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

class Solution {
   public:
    bool inBound(int x, int y, int size) {
        return x >= 0 && y >= 0 && x < size && y < size;
    }
    int find(vector<vector<int>>& grid, stack<pair<int, int>>& path,
             int& shortestL, vector<vector<bool>>& touched) {
        pair<int, int> t = path.top();
        // cout << "at new grid:" << t.first << " " << t.second << "\n";
        // cout << "value of new grid:" << grid[t.first][t.second] << "\n";
        if (t.first == grid.size() - 1 && t.second == grid.size() - 1) {
            // found one
            // cout << "found destination, size is " << path.size() << "\n";
            return path.size();
        }
        // if (inBound(t.first, t.second, grid.size()) &&
        // grid[t.first][t.second] == 0 &&
        //     !touched[t.first][t.second]) {
        // for 8 directions
        // cout << "this grid is valid\n";
        for (int i = 1; i >= -1; i--) {
            for (int j = 1; j >= -1; j--) {
                if (!(i == 0 && j == 0)) {
                    // cout << "at cur grid " << t.first << " "
                    //      << t.second
                    //      << ", push new grid:" << t.first + i << " "
                    //      << t.second + j << "\n";
                    if (inBound(t.first + i, t.second + j, grid.size()) &&
                        !grid[t.first + i][t.second + j] &&
                        !touched[t.first + i][t.second + j]) {

                        path.push({t.first + i, t.second + j});
                        touched[t.first + i][t.second + j] = true;
                        shortestL = min(shortestL,
                                        find(grid, path, shortestL, touched));
                        // cout << "shortestL: " << shortestL << "\n";
                        path.pop();
                        touched[t.first + i][t.second + j] = false;
                    }
                }
            }
        }
        // cout << "before returning shortestL: " << shortestL << "\n";
        return shortestL;
        // }
        // } else {
        // cout << "this grid is invalid\n";
        // path.pop();
        //     return INT32_MAX;
        // }
    }
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        stack<pair<int, int>> path;
        int shortestL = INT32_MAX;
        vector<vector<bool>> touched(grid.size(), vector<bool>(grid.size()));
        if (grid[0][0] == 1 || grid[grid.size() - 1][grid.size() - 1] == 1)
            return -1;
        path.push({0, 0});
        touched[0][0] = true;
        shortestL = find(grid, path, shortestL, touched);
        if (shortestL > 10000) {
            // cout << shortestL << " <- shortestL\n";
            shortestL = -1;
        }
        return shortestL;
    }
};