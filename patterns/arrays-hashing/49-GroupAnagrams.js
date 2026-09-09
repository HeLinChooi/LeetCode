// LC 49 — Group Anagrams                                          [clean]
//
// Pattern: canonical form. Two things are the same if their NORMAL FORMS are
// equal, so build the normal form and let the hash map do the grouping.
//
// The sorted string is that normal form: "eat", "tea" and "ate" all collapse to
// "aet". This is the 3Sum lesson on a new surface — there, the canonical form
// was a sorted triple, which is why the same idea arrived unprompted here.
//
// The map's value is the ANSWER, not a pointer to it. A first version keyed to
// indices and then spent a second loop turning indices back into the strings it
// already had in hand. Ask before declaring a map: what do I want to be holding
// when the loop ends? Store that, and the return is [...map.values()].
//
// O(n·k log k) time for n words of length k — the sort dominates. The follow-up
// worth saying out loud: a 26-slot count array as the key is O(k) instead of
// O(k log k), which drops the total to O(n·k).

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
};
