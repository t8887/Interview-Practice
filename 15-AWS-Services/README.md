# 15 — AWS Services: Interview Prep

## Files in this folder

| File | Services covered |
|------|-----------------|
| [00-cheatsheet.md](00-cheatsheet.md) | All services — rapid-fire table |
| [compute.md](compute.md) | EC2, Lambda, ECS/EKS/Fargate, Auto Scaling |
| [storage.md](storage.md) | S3, EBS, EFS |
| [databases.md](databases.md) | RDS/Aurora, DynamoDB, ElastiCache/Redis |
| [networking.md](networking.md) | VPC, Route 53, CloudFront, ELB (ALB/NLB), API Gateway |
| [messaging-integration.md](messaging-integration.md) | SQS, SNS, EventBridge, Step Functions, Kinesis |
| [iac-devops.md](iac-devops.md) | CloudFormation/SAM, CloudWatch, CodePipeline |
| [security.md](security.md) | IAM, KMS, Secrets Manager, Cognito |
| [analytics-search.md](analytics-search.md) | Athena, OpenSearch, Glue |

---

## Tier 1 — Must-Know (Senior Full-Stack / Node + AWS)

These come up in nearly every AWS-facing interview. Know them cold.

- **Lambda** — execution model, cold starts, concurrency limits, event sources
- **API Gateway** — REST vs HTTP API, Lambda proxy integration, throttling
- **DynamoDB** — partition keys, GSIs, read/write capacity, single-table design
- **S3** — storage classes, presigned URLs, event notifications, lifecycle rules
- **IAM** — roles vs policies, least privilege, instance profiles, STS assume-role
- **SQS** — visibility timeout, DLQ, standard vs FIFO
- **RDS/Aurora** — Multi-AZ vs read replicas, Aurora Serverless
- **VPC** — subnets, route tables, security groups vs NACLs, NAT Gateway
- **CloudWatch** — metrics, logs, alarms, dashboards
- **ECS/Fargate** — task definitions, service auto scaling, networking modes

## Tier 2 — Nice-to-Know

Expect these at senior/architect level or if the JD calls them out specifically.

- EC2 (instance types, ASG, placement groups)
- ElastiCache / Redis (caching patterns, eviction)
- SNS, EventBridge (fan-out, event-driven architecture)
- CloudFront (CDN, cache invalidation, origins)
- Route 53 (routing policies, health checks)
- Step Functions (orchestration vs choreography)
- Kinesis (streaming vs batch, shards)
- CloudFormation / SAM (IaC, stack drift)
- KMS, Secrets Manager, Cognito (security depth)
- Athena, OpenSearch, Glue (data/analytics round)
- CodePipeline (CI/CD round)

---

## How to Study This Folder

1. Read `00-cheatsheet.md` first — anchor each service name to a one-liner.
2. Work through Tier 1 files one service at a time; fill in "Map to my projects" from your own experience.
3. For each service, close the file and recite: *What is it? When do I pick it? Three gotchas.*
4. For system-design rounds, apply services from this folder to problems in `../07-System-Design/`.
5. Before an interview, do a 20-minute pass of `00-cheatsheet.md` only — do not re-read full files.

> Design-round practice lives in **[../07-System-Design/](../07-System-Design/)** — use that folder once you know the individual services here.
