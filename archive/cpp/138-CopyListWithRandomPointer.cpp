#include <bits/stdc++.h>
using namespace std;
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
class Solution {
public:
    Node* copyRandomList(Node* head) {
        // create a list with only val and next by
        // interweave copied list into ori list
        // get the next node first if it exist
      if(head){        
        Node* oldNextNode = head->next;
        // point to new node
        head->next = new Node(head->val);
        Node* curNode = head;
        while(oldNextNode){
          Node* newNextNode = curNode->next;
          newNextNode->next = oldNextNode;
          //
          curNode = oldNextNode;
          oldNextNode = oldNextNode->next;
          curNode->next = new Node(curNode->val);
        }
        // second travel - assign the 'random' pointer of each new node
        // curNode at here is always oldNode
        curNode = head;
        while(curNode != NULL){
          Node* newNextNode = curNode->next;
          newNextNode->random = curNode->random ? curNode->random->next : NULL;
          curNode = curNode->next->next;
        }
        // third travel - separate both lists
        curNode = head;
        Node* result = head->next;
        while(curNode != NULL){
          Node* newNextNode = curNode->next;
          curNode->next = curNode->next->next;
          newNextNode->next = newNextNode->next ? newNextNode->next->next : NULL;
          //
          curNode = curNode->next;
        }
        return result;      
      }
      return NULL;
    }
};