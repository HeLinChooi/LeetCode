// Q3 — Count Robot Groups                                    [TLE in contest]
//
// Pattern: greedy, suffix minimum. Car Fleet family — a merged group takes the
// identity of its RIGHTMOST member, so scan right to left.
//
// Why suffix minimum:
//   1. At t = 0, anything within `distance` merges. Only the rightmost of each
//      run survives; the others' speeds stop mattering forever.
//   2. After t = 0 a merge can only happen by catching up, which needs the left
//      group to be strictly faster. So a group's speed is non-increasing over
//      time, and merging jumps it right, away from whoever is behind.
//   3. Therefore group j eventually catches the stuff ahead iff
//      speed[j] > min(speed[j+1..]). It is its own group otherwise.
//
// Tie direction: equal speeds never close a gap, so `<=` makes it a new group,
// but only a strictly smaller value updates the running minimum.
//
// O(n) time, O(1) space.
//
// Contest failure was NOT the algorithm — this greedy was already correct. It
// was `splice` inside the t=0 cleanup loop, which shifts the tail every call:
// O(n^2). At n = 1e5 that measured 879 ms vs 1 ms for this version.

/**
 * @param {number[]} position
 * @param {number[]} speed
 * @param {number} distance
 * @return {number}
 */
var countGroups = function (position, speed, distance) {
    const n = position.length;
    let groups = 0;
    let suffixMin = Infinity;

    for (let i = n - 1; i >= 0; i--) {
        // not the rightmost of its t=0 run -> absorbed, speed is irrelevant
        if (i + 1 < n && position[i + 1] - position[i] <= distance) continue;

        if (speed[i] <= suffixMin) groups++;             // never catches up
        if (speed[i] < suffixMin) suffixMin = speed[i];
    }
    return groups;
};
