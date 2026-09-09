// LC 347 — Top K Frequent Elements                    [clean (n log n) → O(n)]
//
// Pattern: a BOUNDED KEY is an array index, not a sort key.
//
// The first solve counted with a map, pushed the pairs into an array and sorted
// by frequency. Correct, and O(n log n) — which is exactly the bound the
// problem's follow-up asks you to beat. The counting half was already known
// from 242; the ranking half is the whole content of the problem, and `sort`
// routed around it.
//
// The question that replaces the reflex: WHAT IS THE RANGE OF THE SORT KEY?
// A frequency here cannot exceed nums.length, so it can be an array index.
// buckets[f] holds every number seen exactly f times; walk f down from the top
// and take the first k. Nothing is sorted.
//
// When the key is NOT bounded, the fallback is a heap of size k at O(n log k) —
// that is 215's shape, and it comes later in the plan. Sorting is right only
// when you genuinely need every element ordered.
//
// O(n) time. O(n) space, and honestly so: the buckets array is length n+1 even
// for three distinct values. Volunteer that trade before being asked.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

    // length + 1 so the max possible frequency, nums.length, has a slot.
    // Array.from, not fill([]) — fill puts one SHARED array in every slot.
    const buckets = Array.from({length: nums.length + 1}, () => []);
    for (const [n, f] of freq) buckets[f].push(n);

    const ans = [];
    for (let f = buckets.length - 1; f >= 0 && ans.length < k; f--) {
        for (const n of buckets[f]) {
            ans.push(n);
            if (ans.length === k) break;
        }
    }
    return ans;
};
