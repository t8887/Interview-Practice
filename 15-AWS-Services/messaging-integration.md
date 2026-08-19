---
topic: Messaging & Integration (SQS, SNS, EventBridge, Step Functions, Kinesis)
level: expert
status: solid
last_reviewed: 2026-08-19
next_review: 2026-08-20
---

# Messaging & Integration

---

### SQS
- **What it is:** Fully managed message queue — producers send messages, consumers poll and process them independently.
- **Interviewers probe:**
  - Standard vs FIFO: Standard = at-least-once delivery, best-effort ordering, unlimited throughput; FIFO = exactly-once, strict ordering, 300 TPS (3000 with batching)
  - Visibility timeout — message hidden from other consumers while being processed; if not deleted in time, it reappears
  - Dead-letter queue (DLQ) — receives messages that failed processing N times (maxReceiveCount)
  - Long polling (WaitTimeSeconds up to 20s) vs short polling — long polling reduces empty responses and costs
- **When to use vs alternatives:** SQS for decoupling services, buffering traffic spikes, and async processing. Use FIFO when order matters (payment processing, inventory updates). Use SNS when you need fan-out to multiple consumers. Use EventBridge when you need content-based routing or SaaS event integration.
- **Rapid Q&A:**
  - *What happens if a Lambda consumer throws an error on an SQS message?* The message becomes visible again after visibility timeout; after maxReceiveCount failures, it moves to DLQ.
  - *What is the max message size?* 256 KB; use S3 + SQS Extended Client for larger payloads.
  - *What is message deduplication in FIFO?* Within a 5-minute window, duplicate messages with the same deduplication ID are discarded.
- **Gotchas/limits:**
  - Standard queue can deliver a message more than once — consumers must be idempotent.
  - Message retention is 1 minute to 14 days (default 4 days).
  - Lambda SQS trigger uses long polling internally; batch size and concurrency must be tuned to avoid throttling.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### SNS
- **What it is:** Pub/sub messaging service — publishers send to a topic, SNS fans out to all subscribed endpoints simultaneously.
- **Interviewers probe:**
  - Subscriptions: SQS, Lambda, HTTP/HTTPS, email, SMS, mobile push
  - Fan-out pattern: SNS topic → multiple SQS queues (each consumer gets its own queue)
  - Message filtering — subscription filter policies let each subscriber receive only relevant messages
  - FIFO SNS topics (paired with FIFO SQS) for ordered fan-out
- **When to use vs alternatives:** SNS when one event must reach multiple consumers simultaneously. SQS alone is point-to-point (one consumer per message). SNS + SQS fan-out combines both: broadcast + durable, independent consumption. EventBridge is more powerful for filtering and routing but SNS is simpler for pure fan-out.
- **Rapid Q&A:**
  - *What is the SNS fan-out pattern?* Publish once to an SNS topic; SNS delivers to multiple SQS queues so each downstream service processes independently.
  - *What is a message filter policy?* JSON attributes on a subscription that cause SNS to skip delivery if the message attributes don't match.
  - *Is SNS delivery guaranteed?* No — SNS is at-least-once for SQS/Lambda; HTTP endpoints have retry with backoff but can drop after exhaustion.
- **Gotchas/limits:**
  - SNS does not persist messages — if no subscribers or delivery fails permanently, the message is lost.
  - SMS delivery via SNS has country-specific throughput limits and costs.
  - FIFO SNS topic requires FIFO SQS subscriber — cannot mix with standard queues.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### EventBridge
- **What it is:** Serverless event bus that routes events from AWS services, custom applications, and SaaS providers to targets based on content-based rules.
- **Interviewers probe:**
  - Event buses: default (AWS service events), custom (your app events), partner (SaaS integrations)
  - Rules with event patterns — filter events by content (source, detail-type, any field) and route to targets
  - Targets: Lambda, SQS, SNS, Step Functions, Kinesis, API Gateway, EC2, and more
  - Schema registry — auto-discovers and stores event schemas; generates code bindings
- **When to use vs alternatives:** EventBridge for event-driven architecture where routing logic is content-based or involves multiple services/SaaS. SNS is simpler for pure fan-out with basic attribute filtering. SQS is better for point-to-point work queues. EventBridge Pipes (source→optional filter→enrichment→target) replaces many glue Lambda functions.
- **Rapid Q&A:**
  - *What is the difference between EventBridge and SNS?* EventBridge has richer content-based filtering, schema registry, SaaS integrations, and archive/replay; SNS is simpler fan-out with attribute filtering.
  - *What is EventBridge Scheduler?* A feature to schedule one-time or recurring events (replaces CloudWatch Events cron rules).
  - *Can EventBridge be used for cross-account routing?* Yes — event buses support resource-based policies for cross-account event delivery.
- **Gotchas/limits:**
  - Default event bus only accepts events from AWS services — custom events need a custom bus.
  - EventBridge rule evaluation adds a small latency overhead vs direct invocations.
  - Events must be ≤256 KB.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Step Functions
- **What it is:** Serverless visual workflow orchestrator that coordinates multiple AWS services into multi-step state machines.
- **Interviewers probe:**
  - Standard workflows (exactly-once, up to 1 year, auditable history) vs Express workflows (at-least-once, up to 5 min, high throughput)
  - State types: Task, Choice, Wait, Parallel, Map, Pass, Succeed, Fail
  - Error handling: Catch and Retry blocks per state — retry with exponential backoff
  - Saga pattern implementation: sequential steps with compensating transactions on failure
- **When to use vs alternatives:** Step Functions for multi-step workflows needing retry logic, branching, parallel execution, or long-running orchestration. Use SQS/Lambda chains for simple sequential processing — simpler and cheaper. EventBridge choreography vs Step Functions orchestration: choreography is looser coupling, orchestration gives visibility and control.
- **Rapid Q&A:**
  - *What is the difference between orchestration and choreography?* Orchestration (Step Functions) has a central coordinator; choreography (EventBridge/SNS) has services react to events independently.
  - *How do you handle partial failures in a distributed transaction?* Saga pattern — each step has a compensating action; on failure, Step Functions runs compensations in reverse.
  - *What is a Map state?* Iterates over an array and runs the same steps for each item — can run iterations in parallel.
- **Gotchas/limits:**
  - Standard workflow state history is stored and searchable but costs per state transition.
  - Express workflows do not have execution history browsable in console — use CloudWatch Logs.
  - Max payload between states is 256 KB — use S3 to pass large data.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Kinesis
- **What it is:** Platform for real-time streaming data ingestion and processing at scale. Key services: Kinesis Data Streams (KDS), Kinesis Data Firehose (KDF).
- **Interviewers probe:**
  - Shards: unit of capacity (1 MB/s write, 2 MB/s read per shard); scale by splitting/merging shards
  - Partition key determines which shard a record lands on — hot shard problem if keys are skewed
  - Consumer types: shared throughput (polling) vs enhanced fan-out (push, 2 MB/s per consumer per shard)
  - Kinesis Firehose: fully managed delivery to S3, Redshift, OpenSearch — no consumer code needed
- **When to use vs alternatives:** Kinesis for real-time streaming that needs ordered, replayable records with multiple consumers. SQS for async task queues (no ordering requirement, one consumer per message). Firehose when you just need to land streaming data in S3/Redshift without writing consumer code. MSK (Managed Kafka) for teams that need Kafka-compatible API or more consumer group flexibility.
- **Rapid Q&A:**
  - *What is the retention period for Kinesis Data Streams?* Default 24 hours; extendable to 7 days (standard) or 365 days (long-term retention) [VERIFY-2026].
  - *What is a hot shard?* A shard receiving disproportionate traffic because many records share the same partition key; causes throttling.
  - *How does Lambda read from Kinesis?* Via an event source mapping — Lambda polls the shard and receives batches; processes in order per shard.
- **Gotchas/limits:**
  - Kinesis Data Streams requires manual shard management (or use On-Demand mode for automatic scaling).
  - Records are immutable — you cannot update or delete individual records.
  - Each shard supports 5 read transactions/second — enhanced fan-out is needed for multiple high-throughput consumers.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

## Prerequisites
[`15-AWS-Services/00-cheatsheet.md`](./00-cheatsheet.md) (one-liner orientation before this file's depth).

## Related
[`07-System-Design/in-depth/06-message-queues.md`](../07-System-Design/in-depth/06-message-queues.md) (the vendor-agnostic queue-theory counterpart — Kafka/RabbitMQ patterns vs. this file's AWS-API-specific mechanics; complementary, not duplicative). `19-Distributed-Systems/03-idempotency.md` (❌ not yet created — the DLQ-retry idempotency requirement this file names in its SQS gotchas connects directly to that planned file).

## Interview Questions (hardest first)
1. Design a system handling 100K events/second — why does EventBridge alone not suffice at that scale, and what does Kinesis add that SQS/SNS don't have?
2. Explain the SNS fan-out pattern end-to-end: one `order.created` event → 2+ independent SQS subscriber queues. What happens if one subscriber's queue is down?
3. Standard vs. Express Step Functions workflows — which would you use for a payment saga with compensating transactions, and why does the choice depend on the 5-minute execution limit?
4. A Kinesis shard is "hot" — what caused it, and what's the fix that doesn't involve just adding more shards?
5. Explain why an SQS Standard queue consumer MUST be idempotent, using the visibility-timeout mechanism to justify the answer, not just "because AWS says so."

## Exercises
1. Add a subsection defining `SendMessageBatch`/`SendMessageBatchRequestEntry` and its cost/throughput implications — referenced twice in this file, never defined.
2. Once `07-System-Design/in-depth/06-message-queues.md` is re-read, add explicit cross-links between the vendor-agnostic patterns there and this file's AWS-specific mechanics.
3. Write a worked Saga-pattern Step Functions state machine (states + Catch/Retry + a compensating-transaction branch) — currently only described in prose here.

## My Real-World Usage
This is the single highest direct match to `CLAUDE.md`'s named AWS stack (SQS/SNS/EventBridge) of any file in the repo — the UTEC notification engine's fan-out design and the Vkonnect Lambda migration both map directly onto the SQS/SNS sections above; "Map to my projects" is blank in every section and should be filled with those two stories specifically.

## Common Mistakes
- Assuming SQS Standard delivers exactly-once (it's at-least-once — consumers must be idempotent).
- Confusing SNS (no persistence — a message is lost if delivery fails permanently with no DLQ configured) with SQS (persistent, durable queue).
- Picking EventBridge for pure fan-out when SNS is simpler and cheaper for that specific case — EventBridge earns its complexity when routing is content-based, not just "many subscribers."
