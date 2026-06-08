# Compute

---

### EC2
- **What it is:** Virtual machines (instances) running on AWS hardware; full OS-level control.
- **Interviewers probe:**
  - Instance families (general purpose t/m, compute-optimized c, memory-optimized r/x, storage-optimized i/d)
  - Pricing models: On-Demand vs Reserved vs Spot vs Savings Plans
  - AMIs, user data, instance metadata service (IMDS v2)
  - Placement groups: cluster (low latency) vs spread (HA) vs partition (large distributed)
- **When to use vs alternatives:** Use EC2 when you need persistent compute, specific OS configuration, or stateful workloads. Prefer Lambda for event-driven stateless work; prefer ECS/Fargate for containers; prefer RDS over running a DB on EC2 yourself.
- **Rapid Q&A:**
  - *What's the difference between stopping and terminating?* Stop keeps the EBS root volume; terminate deletes it by default.
  - *What is an instance profile?* An IAM role attached to an EC2 instance, grants it AWS API permissions without hard-coding credentials.
  - *What is Spot interruption?* AWS can reclaim Spot instances with 2-minute notice when capacity is needed.
  - *What is IMDS v2?* Session-oriented metadata API that mitigates SSRF attacks on metadata endpoint.
- **Gotchas/limits:**
  - Public IP is lost on stop unless you use an Elastic IP.
  - Default vCPU quotas per region are soft limits — request increases for large deployments.
  - Spot instances are not suitable for workloads that cannot handle interruption.
- **Recency:** Graviton4 instances available [VERIFY-2026]; conceptual fundamentals stable.
- **Map to my projects:** _(leave blank)_

---

### Lambda
- **What it is:** Serverless function execution — upload code, AWS runs it on demand, you pay per invocation and duration.
- **Interviewers probe:**
  - Cold start vs warm start; provisioned concurrency to eliminate cold starts
  - Concurrency model: reserved concurrency vs unreserved; account-level default 1000 concurrent executions
  - Event source mappings: SQS, Kinesis, DynamoDB Streams, S3, API Gateway
  - Execution limits: 15-minute max timeout, 10 GB memory max, 512 MB–10 GB ephemeral `/tmp`
- **When to use vs alternatives:** Use Lambda for stateless, short-lived, event-driven tasks. Avoid for long-running jobs (>15 min), heavy CPU/GPU workloads (use EC2/ECS), or workloads needing persistent connections (use ECS). For high-frequency sub-100ms jobs, cold starts on Lambda HTTP APIs can be a concern — use provisioned concurrency or HTTP API (lower latency than REST API).
- **Rapid Q&A:**
  - *What causes a cold start?* No warm execution environment available; Lambda must initialize the runtime and your init code.
  - *How do you share code across Lambda functions?* Lambda Layers — a versioned ZIP mounted at `/opt`.
  - *What is the difference between synchronous and asynchronous invocation?* Sync waits for response; async queues the event and retries on failure (up to 2 retries).
  - *What is a DLQ in Lambda?* A dead-letter queue (SQS or SNS) that receives events Lambda failed to process after retries.
- **Gotchas/limits:**
  - `/tmp` is ephemeral per execution environment, not per invocation — can be reused across warm invocations.
  - Concurrency limit is per account per region, not per function by default.
  - Lambda inside a VPC adds ENI provisioning latency (cold start impact).
- **Recency:** Supported runtimes (Node 20/22, Python 3.12/3.13) [VERIFY-2026]; execution model fundamentals stable.
- **Map to my projects:** _(leave blank)_

---

### ECS / EKS / Fargate
- **What it is:** ECS = AWS-native container orchestrator. EKS = managed Kubernetes. Fargate = serverless compute layer for both (no EC2 nodes to manage).
- **Interviewers probe:**
  - ECS task definition (CPU/memory, image, env vars, IAM task role) vs service (desired count, load balancer, auto scaling)
  - ECS launch types: EC2 (you manage nodes) vs Fargate (AWS manages nodes)
  - EKS: node groups vs managed node groups vs Fargate profiles
  - Networking modes: `awsvpc` (each task gets its own ENI) vs `bridge` vs `host`
- **When to use vs alternatives:** ECS is simpler for teams already on AWS with no K8s requirement. EKS when you need K8s portability, Helm ecosystem, or existing K8s expertise. Fargate removes node management but costs more per vCPU/memory than reserved EC2 nodes for steady-state workloads.
- **Rapid Q&A:**
  - *What is the difference between a task and a service in ECS?* Task is a one-time run; service maintains a desired number of running tasks and restarts failures.
  - *How does ECS service discovery work?* Via AWS Cloud Map or an internal ALB/NLB.
  - *What is a sidecar container?* An additional container in the same task definition sharing network/storage with the main app container.
- **Gotchas/limits:**
  - `awsvpc` mode uses one ENI per task — watch ENI limits per instance type for EC2 launch type.
  - Fargate cold starts are slower than warm EC2-backed tasks.
  - EKS control plane costs ~$0.10/hr [VERIFY-2026] regardless of workload size.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Auto Scaling
- **What it is:** Automatically adjusts the number of EC2 instances (or ECS tasks, DynamoDB capacity, etc.) based on demand.
- **Interviewers probe:**
  - Scaling policies: target tracking (simplest), step scaling, scheduled scaling
  - Cooldown periods to prevent thrashing
  - Launch templates vs launch configurations (launch configurations are deprecated)
  - Auto Scaling Groups (ASG): min/max/desired, health checks, lifecycle hooks
- **When to use vs alternatives:** Always use with EC2 for production. For containers, use ECS Service Auto Scaling instead. For Lambda, concurrency auto-scales natively. The interview question is usually about *tuning* — what metric to track, what the cooldown should be, and how to handle stateful instances gracefully.
- **Rapid Q&A:**
  - *What is a lifecycle hook?* Pauses an instance during scale-out or scale-in so you can run custom actions (e.g., draining connections).
  - *What metric triggers target tracking scaling?* Default is CPU utilization; you can use any CloudWatch metric including custom ones.
  - *What is the difference between step and target tracking?* Target tracking is self-tuning; step scaling gives you explicit thresholds and step adjustments.
- **Gotchas/limits:**
  - ASG health checks default to EC2 status; enable ELB health checks so unhealthy instances behind a load balancer are replaced.
  - Scale-in protection prevents specific instances from being terminated during scale-in.
  - Warm pools can pre-initialize instances to reduce scale-out latency [VERIFY-2026].
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
