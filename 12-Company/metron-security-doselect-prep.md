# Metron Security — DoSelect Code Test Prep

**Role:** Senior Software Engineer, Pune (Cyber Security Product Engineering)
**Stack in JD:** Node.js, NestJS, Next.js, TypeScript | REST/GraphQL | SQL/NoSQL | event-driven, high-volume security data
**Test platform:** DoSelect | **Format (confirmed from test gateway): 2 hours, 2 problems to be solved**

---

## 1. What the format tells you

2 hours for 2 problems = ~1 hour per problem. Nobody gives 60 minutes for two-sum-tier questions. Expect **medium (possibly medium-hard) problems, or practical implementation tasks**, where they care about:

- All hidden test cases passing (edge cases!)
- Clean, readable code — this is a senior role; assume a human reviews your submission after the auto-score
- Complete solutions > fast sloppy ones. Speed is not the constraint here; correctness is.

Solve in **JavaScript/Node.js** — it's your strongest language and matches the JD.

---

## 2. Confirmed test rules (from the DoSelect gateway page)

- 2 hours, 2 problems, access password required (from their email)
- Use latest Chrome/Firefox/Edge/Safari, **incognito mode**, **all extensions disabled**
- **Quiet, private room — background noise or other voices may be flagged as suspicious activity and can impact your result.** Treat this like the Coffeee.io proctoring: door closed, phone silent, no one walks in.
- **Take the sample assessment first** to learn the environment: `t.dos.lc/new-sample-test`, password `sample` (first-time users only). Do this a day before, not 10 minutes before.

Typical DoSelect mechanics (verify in the UI): browser IDE with language picker, "Run" executes visible sample cases, "Submit" runs hidden cases, partial credit per test case, tab-switching and code-similarity (plagiarism) monitoring. Assume copy-pasting AI-generated code will get flagged — type your own solutions.

---

## 3. Likely problem flavors (JD-informed prediction)

Metron builds **integrations that move security event data between platforms** (SIEM/SOAR/XDR — Splunk, QRadar, CrowdStrike, XSOAR). The JD says "high-volume data processing, event-driven architectures." Screening tests usually echo the domain, so the highest-probability archetypes:

1. **Log/string parsing + aggregation** — parse log lines, filter by level, group/count by field, top-K results
2. **Hashmap/frequency problems** — top-K frequent elements (IPs, endpoints), dedupe events, group anagrams-style bucketing
3. **Intervals** — merge overlapping time ranges, find gaps (very "security events" flavored)
4. **Sliding window / rate limiting** — max in window, requests-per-window logic
5. **Design-a-small-thing** — LRU cache, rate limiter class, async task runner with concurrency limit
6. **Classic mediums** — longest substring variants, subarray sums, matrix traversal

Your Set 1 file (two sum, longest substring, frequency count, etc.) is the foundation. Below is Set 2 — the tier this test actually lives in.

---

## 4. Set 2 — solved problems (JS)

### 4.1 Top-K Frequent Elements (think: top 5 attacking IPs)

```js
function topKFrequent(items, k) {
  const freq = new Map();
  for (const it of items) freq.set(it, (freq.get(it) || 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])   // sort by count desc
    .slice(0, k)
    .map(([item]) => item);
}

topKFrequent(["10.0.0.5","10.0.0.9","10.0.0.5","10.0.0.7","10.0.0.5","10.0.0.9"], 2);
// ["10.0.0.5", "10.0.0.9"]
```

O(n log n) time — fine for test constraints. If asked to optimize: bucket sort by count → O(n).
Tie-breaking: read the problem statement — they often specify "if counts are equal, return lexicographically smaller first" → add `|| a[0].localeCompare(b[0])` to the comparator.

### 4.2 Log Parsing + Aggregation (the Metron-est problem imaginable)

```js
// Input lines like: "2026-07-17T10:00:01Z ERROR auth Failed login from 10.0.0.5"
// Task: count ERROR lines per source module

function errorCountsBySource(lines) {
  const counts = {};
  for (const line of lines) {
    const parts = line.split(" ");
    const level = parts[1];
    const source = parts[2];
    if (level === "ERROR") counts[source] = (counts[source] || 0) + 1;
  }
  return counts;
}
```

Variations to be ready for: filter by time range (compare ISO strings works lexicographically, or `new Date(ts).getTime()`), extract IPs with a regex `/\b\d{1,3}(\.\d{1,3}){3}\b/`, return results sorted by count (compose with 4.1). The pattern is always: **parse → filter → group → sort**. Practice writing that pipeline from memory.

### 4.3 Merge Intervals (overlapping event/alert windows)

```js
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);   // overlap -> extend
    } else {
      result.push([start, end]);           // gap -> new interval
    }
  }
  return result;
}

mergeIntervals([[1,3],[2,6],[8,10],[15,18]]); // [[1,6],[8,10],[15,18]]
```

O(n log n). Edge cases: empty input, single interval, fully-contained interval `[1,10],[2,3]`, touching boundaries `[1,2],[2,3]` (usually merge — confirm in statement).

### 4.4 LRU Cache (classic "design a small thing"; JS Map keeps insertion order — huge shortcut)

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);      // refresh recency:
    this.map.set(key, val);    // delete + re-insert moves it to the end
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      const oldest = this.map.keys().next().value; // first key = least recent
      this.map.delete(oldest);
    }
    this.map.set(key, value);
  }
}
```

Both ops O(1). If the interviewer later asks "without Map order?" → doubly linked list + hashmap (know the idea, don't memorize code).

### 4.5 Sliding-Window Rate Limiter (JD says event-driven + high volume)

```js
class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.hits = new Map(); // clientId -> array of timestamps
  }
  allow(clientId, now = Date.now()) {
    const recent = (this.hits.get(clientId) || [])
      .filter(t => now - t < this.windowMs);   // drop expired hits
    if (recent.length >= this.limit) {
      this.hits.set(clientId, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(clientId, recent);
    return true;
  }
}

const rl = new RateLimiter(3, 1000);
rl.allow("ip1"); rl.allow("ip1"); rl.allow("ip1"); // true, true, true
rl.allow("ip1");                                    // false (4th in window)
```

Talk track if asked: filtering arrays is O(hits) per call; for production scale you'd use a token bucket or fixed-window counters in Redis.

### 4.6 Async Pool — run N promises with concurrency limit (senior Node signal)

```js
async function asyncPool(limit, tasks) {   // tasks: array of () => Promise
  const results = [];
  const executing = new Set();

  for (let i = 0; i < tasks.length; i++) {
    const p = Promise.resolve().then(tasks[i]);
    results[i] = p;                        // preserve order of results
    executing.add(p);
    p.finally(() => executing.delete(p));
    if (executing.size >= limit) {
      await Promise.race(executing);       // wait for any slot to free
    }
  }
  return Promise.all(results);
}

// e.g. fetch 100 URLs, max 5 in flight:
// const data = await asyncPool(5, urls.map(u => () => fetch(u)));
```

This is exactly the kind of problem a Node-heavy integration shop loves. Understand every line — `Promise.race` on the executing set is the trick.

---

## 5. The 2-hour game plan

- **0:00–0:10** — Read BOTH problems fully. Pick the easier one first. Note input format, constraints (n size tells you required complexity), and output format exactly.
- **0:10–0:50** — Problem 1: brute-force mentally → pick pattern → code → pass sample cases → then hunt edge cases: empty input, single element, all-same values, max n, negatives, duplicates.
- **0:50–1:45** — Problem 2, same loop. If stuck 20+ min on the optimal approach, submit a working brute force first (partial credit per test case), then optimize.
- **1:45–2:00** — Re-run everything. Clean up: meaningful names, remove debug logs, add 2–3 comments explaining approach. A human likely reads this for a senior hire.

Rules of survival: never leave a problem at 0 — partial credit is real. Read output format twice (return vs print, sorted vs unsorted, indices vs values kill more submissions than algorithms do).

---

## 6. Environment checklist (day before)

- [ ] Take the DoSelect sample test (`t.dos.lc/new-sample-test`, password `sample`)
- [ ] Chrome incognito, all extensions disabled, laptop charged + plugged in
- [ ] Quiet room booked at home — noise/voices can be flagged as suspicious
- [ ] Stable internet (hotspot backup ready)
- [ ] Access password from Metron's email copied somewhere handy
- [ ] Water, and phone on silent, face-down, out of reach

---

## 7. Company intel (for the rounds after the test)

**What Metron actually does:** Not a product company in the classic sense — they're the integration/automation specialists of the security world. Since 2014 they've built connectors and automation for 150+ security platforms (Splunk, IBM QRadar, ServiceNow, CrowdStrike, Cybereason, Cortex XSOAR — SIEM/SOAR/XDR ecosystems), serving security vendors and MSSPs on a fixed-cost model. HQ Novato, California; dev offices in Pune (Baner) and Bangalore. The JD you have is for their newer product engineering track — building their own security products, not just client integrations. Good question to ask them: "How is the product team separated from the services/integration business?"

**Your fit map:**
- Strong: Node.js/TypeScript depth, event-driven + high-volume processing (UTEC serverless at 6M users), security exposure (VAPT remediation at iProgrammer), LLM integration in production (EY Risk.ai — their "AI-Driven Products" bonus point, hit it hard), AWS, CI/CD, GitHub profile to share (they explicitly ask!)
- Gaps to close before the tech interview (NOT needed for this coding test): **NestJS** (modules, providers/DI, decorators, guards vs interceptors vs pipes, exception filters) and **Next.js** (App Router, SSR vs SSG vs ISR, server components, API routes). Both are thin frameworks over what you already know — 2 focused evenings each.

**Reputation check:** Employee reviews for the Pune office are mixed and the sample is small — some flag heavy workload, abrupt exits, and thin onboarding/training. Standard staffing-adjacent-company risks. Don't let it spook you off a good offer, but in the HR round ask specifically: team size and attrition on the product team, onboarding plan for the first 60 days, and how work is allocated between product and client-integration work.

---

## 8. Active recall drill (night before)

1. Write `topKFrequent` and `mergeIntervals` from a blank file, no peeking.
2. Say out loud: why does delete+set make JS `Map` work as an LRU? (Map preserves insertion order; re-inserting moves the key to the end, so the first key is always least-recent.)
3. What do you do if stuck at minute 25 on problem 2? (Submit brute force for partial credit, then optimize.)
4. `[1,2].sort()` vs `[10,9].sort()` — why is only one of them wrong? (String comparison: "10" < "9".)
5. In `asyncPool`, what does `Promise.race(executing)` accomplish? (Blocks the loop until any in-flight task settles, freeing a concurrency slot.)
