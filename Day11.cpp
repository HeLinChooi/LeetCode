#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        map<char, int> sFreq;
        map<char, int> tFreq;
        for(int i = 0; i < s.length(); i++){
          if(sFreq.find(s.at(i)) == sFreq.end()){
            sFreq.insert(pair<char, int>(s.at(i),1));
          }else{
            sFreq[s.at(i)] = ++sFreq[s.at(i)];
          }
        }
      for(int i = 0; i < t.length(); i++){
          if(tFreq.find(t.at(i)) == tFreq.end()){
            tFreq.insert(pair<char, int>(t.at(i),1));
          }else{
            tFreq[t.at(i)] = ++tFreq[t.at(i)];
          }
      }
      if(sFreq.size() != tFreq.size()) return false;
      map<char,int>::iterator itr = sFreq.begin();
      map<char,int>::iterator itr2 = tFreq.begin();
      for(; itr != sFreq.end();){
        if(itr->first != itr2->first || itr->second != itr2->second){
          return false;
        }
        itr++;
        itr2++;
      }
      return true;
    }
};