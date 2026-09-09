# LeetCode

One file per problem, named `<number>-<Name>.js`. Contest solutions go under
`contests/<yyyy-mm-dd>/`, one file per question. Each file starts with a header
comment giving the pattern and what went wrong or right.

JavaScript is the interview language. The `.cpp` files under `archive/` are from
before that decision. Write new solutions in JavaScript unless asked otherwise.

## The notes are not here

The notes are in the `knowledge-base` repo, under `docs/interviews/`. There are
three files: the prep plan, the prep log, and the patterns file. That repo's
`CLAUDE.md` imports all three.

Open that repo before advising on what to solve next, or on how a solve went.
This repo holds the code. It does not hold the record of which problems went
badly, and that record is what the advice depends on.

After each problem, update all three files. Add a row to the log. Update the
status in the plan. Add to the patterns file only when the idea is worth more
than the problem that taught it.

## Working rules, from the log

- Set a 25-minute timer. If you are stuck at 25 minutes, read the editorial,
  understand it, close the tab, and write the solution again from blank.
- Write the approach as a comment before writing code. State the target
  complexity in the same comment. A solution can be accepted and still be too
  slow for the complexity the problem asks for. The accepted mark does not check
  that, so you have to.
- Re-solve each problem on day +3 and day +10. If you fall behind, drop a new
  problem. Never drop the re-solve.
- Sometimes I give Coin the answer to a problem, in a review or a hint or an
  explanation. After that, do not use that problem as a re-solve. He would be
  remembering what I said rather than working it out. Use a different problem
  that needs the same idea. The prep log applies the same rule to problems he
  solved years ago.

## This repo is published

This repo is a source for kb.helinchooi.com. Any `.md` file written here becomes
a page at `/leetcode/` on the next build. The site reads the file from this
folder, so there is never a second copy to keep up to date.
