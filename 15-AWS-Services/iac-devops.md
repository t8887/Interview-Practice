# IaC & DevOps

---

### CloudFormation / SAM
- **What it is:** CloudFormation = AWS's IaC service; define infrastructure in JSON/YAML templates, CF provisions and manages the stack lifecycle. SAM (Serverless Application Model) = CloudFormation extension with shorthand for Lambda, API Gateway, and DynamoDB.
- **Interviewers probe:**
  - Stack drift — detected when actual resource config diverges from template; CF can detect but not auto-remediate
  - Change sets — preview what will be added/modified/deleted before applying a stack update
  - Stack outputs and cross-stack references via exports (or SSM Parameter Store for loose coupling)
  - Nested stacks vs StackSets: nested stacks compose large templates; StackSets deploy across multiple accounts/regions
- **When to use vs alternatives:** CloudFormation/SAM for AWS-native IaC with no extra tooling. Terraform for multi-cloud or teams preferring HCL and a state-file model. CDK (Cloud Development Kit) for defining CF stacks in TypeScript/Python — generates CF under the hood. SAM is preferred for pure serverless apps; CDK for complex infra with logic.
- **Rapid Q&A:**
  - *What happens when a CloudFormation stack update fails?* CF automatically rolls back to the previous known-good state by default.
  - *What is the difference between a parameter and a mapping in CloudFormation?* Parameters are runtime inputs; mappings are static lookup tables in the template.
  - *What is `sam local invoke`?* Runs a Lambda function locally in a Docker container to test before deploying.
  - *What is a deletion policy?* A per-resource policy (Retain, Snapshot, Delete) controlling what happens to the resource when the stack is deleted.
- **Gotchas/limits:**
  - Hard limits: 500 resources per stack, 200 stacks per account per region [VERIFY-2026].
  - Stack updates that require resource replacement (e.g., changing an RDS instance class) cause downtime.
  - CF does not manage resources created outside of it — importing existing resources requires resource import.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### CloudWatch
- **What it is:** AWS's observability service — collects metrics, logs, traces; sets alarms; creates dashboards; triggers automated actions.
- **Interviewers probe:**
  - Metrics: namespace/dimension model; default metrics (CPU, NetworkIn) vs custom metrics (app-specific)
  - Logs: log groups → log streams; retention policy; metric filters to turn log patterns into metrics
  - Alarms: threshold-based on a metric; states OK/ALARM/INSUFFICIENT_DATA; actions: SNS, Auto Scaling, EC2
  - CloudWatch Logs Insights — SQL-like query language for log analysis
- **When to use vs alternatives:** CloudWatch is the default observability layer for all AWS services — use it first. Augment with X-Ray for distributed tracing across Lambda/API Gateway/ECS. Use third-party tools (Datadog, Grafana) when you need richer dashboards or cross-cloud visibility. Structured logging (JSON) in CloudWatch enables Logs Insights queries.
- **Rapid Q&A:**
  - *What is a metric filter?* A pattern applied to a log group that increments a CloudWatch metric when matched — turns log events into numeric metrics.
  - *What is the CloudWatch agent?* A process installed on EC2/on-prem to ship OS-level metrics (memory, disk) and custom log files to CloudWatch.
  - *What is a composite alarm?* An alarm that combines multiple other alarms with AND/OR logic — reduces alarm noise.
  - *What is the minimum granularity for metrics?* 1 minute standard; 1 second with high-resolution custom metrics.
- **Gotchas/limits:**
  - Memory and disk utilization are NOT collected by default — requires CloudWatch agent.
  - Log retention defaults to indefinite — set a retention policy to control costs.
  - Alarms based on missing data can behave unexpectedly — configure `treat missing data` carefully.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### CodePipeline
- **What it is:** Fully managed CI/CD pipeline service that automates the build, test, and deploy stages for application and infrastructure changes.
- **Interviewers probe:**
  - Pipeline stages: Source → Build → Test → Deploy; each stage has one or more actions
  - Integrations: Source from CodeCommit/GitHub/S3; Build via CodeBuild; Deploy via CodeDeploy, ECS, Elastic Beanstalk, CloudFormation, Lambda
  - Manual approval action — inserts a human gate between stages (e.g., before prod deploy)
  - Artifacts: each stage outputs artifacts stored in S3, passed to subsequent stages
- **When to use vs alternatives:** CodePipeline for AWS-native CI/CD with deep service integrations. GitHub Actions or GitLab CI when your team is already there and prefers pipeline-as-code in the repo. Jenkins for on-prem or heavily customized pipelines. CodePipeline is best when the entire stack is AWS and you want managed infrastructure for the pipeline itself.
- **Rapid Q&A:**
  - *What is CodeBuild?* A fully managed build service that compiles code, runs tests, and produces artifacts — used as the Build action in CodePipeline.
  - *What is CodeDeploy?* A deployment service that handles rolling, blue/green, and canary deployments to EC2, ECS, Lambda, or on-prem servers.
  - *How do you implement blue/green with CodePipeline?* CodeDeploy ECS deployment type or CloudFormation stack updates with traffic shifting.
- **Gotchas/limits:**
  - CodePipeline has no built-in parallelism across pipelines — fan-out requires multiple pipelines or a Lambda trigger.
  - Pipeline execution is per-commit sequential; if a new commit arrives while the pipeline runs, it queues (or supersedes — configurable).
  - CodeBuild build minutes are billed; idle pipelines cost nothing but active builds add up.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
