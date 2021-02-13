#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numberOfSteps (int num) {
      int ctr = 0;
        while(num != 0){
          if(num%2==1 && num != 1)ctr+=2;
          else ctr++;
          num/=2;
        }
      return ctr;
    }
};