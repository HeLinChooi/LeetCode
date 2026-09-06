// LC 21 — Merge Two Sorted Lists
//
// Pattern: handle the empty case inside, not at every call site.
//
// The submitted version worked but opened with three guard clauses and a block
// to choose the first node, plus two more null checks inside the loop. All six
// existed to work around one assumption: that the result list must start with
// a real node.
//
// A dummy head is a throwaway node you build behind and then discard by
// returning dummy.next. It guarantees `tail` is never null, which is what all
// six special cases were defending against.

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    const dummy = new ListNode();
    let tail = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
        else                        { tail.next = list2; list2 = list2.next; }
        tail = tail.next;
    }

    tail.next = list1 || list2;   // whichever still has nodes, or null
    return dummy.next;            // both-empty falls out for free
};
