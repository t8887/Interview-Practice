# AWS Services — Rapid-Fire Cheatsheet

| Service | One-liner | Reach for it when… |
|---------|-----------|-------------------|
| **EC2** | Virtual machine in the cloud | You need full OS control, persistent compute, or a specific instance type |
| **Lambda** | Function-as-a-service, runs on events | Stateless short-lived tasks, event-driven pipelines, serverless APIs |
| **ECS** | Container orchestration on AWS-managed control plane | You want containers without managing Kubernetes |
| **EKS** | Managed Kubernetes | You need Kubernetes portability or already run K8s elsewhere |
| **Fargate** | Serverless compute engine for ECS/EKS | You want containers without managing EC2 nodes |
| **Auto Scaling** | Automatically adjusts EC2/ECS capacity | Any workload with variable traffic |
| **S3** | Infinitely scalable object storage | Blobs, static assets, data lake, backups |
| **EBS** | Block storage volume attached to one EC2 | OS disk, database storage needing low-latency block I/O |
| **EFS** | Managed NFS shared across multiple EC2s | Shared file system for multiple instances simultaneously |
| **RDS** | Managed relational DB (Postgres, MySQL, etc.) | Traditional SQL workloads without DBA overhead |
| **Aurora** | AWS-optimized MySQL/Postgres-compatible DB | High-throughput relational, multi-region, or serverless relational |
| **DynamoDB** | Serverless NoSQL key-value + document store | Single-digit-ms at any scale, simple access patterns |
| **ElastiCache/Redis** | Managed in-memory cache/store | Session store, leaderboard, rate limiting, DB query cache |
| **VPC** | Isolated private network in AWS | Every production workload — always |
| **Route 53** | DNS + health checks + traffic routing | Domain management, latency/geo/failover routing |
| **CloudFront** | Global CDN with edge caching | Static assets, API acceleration, DDoS edge protection |
| **ALB** | HTTP/HTTPS load balancer with path/host routing | Web apps, microservices, gRPC |
| **NLB** | Layer-4 TCP/UDP load balancer, ultra-low latency | Gaming, VoIP, static IP requirements |
| **API Gateway** | Managed HTTP/WebSocket API front door | Lambda-backed APIs, REST/WebSocket endpoints |
| **SQS** | Fully managed message queue | Decoupling services, buffering spikes, async processing |
| **SNS** | Pub/sub topic fan-out | Broadcast one event to multiple subscribers |
| **EventBridge** | Serverless event bus with schema registry | Event-driven architecture across AWS services and SaaS |
| **Step Functions** | Visual serverless workflow orchestrator | Multi-step business processes, saga pattern, retry logic |
| **Kinesis** | Real-time data streaming at scale | Log ingestion, clickstreams, real-time analytics |
| **CloudFormation** | Infrastructure-as-code via JSON/YAML templates | Repeatable, version-controlled infrastructure provisioning |
| **SAM** | CloudFormation extension for serverless apps | Lambda/API Gateway/DynamoDB stacks with less boilerplate |
| **CloudWatch** | Metrics, logs, alarms, dashboards | Observability for any AWS resource |
| **CodePipeline** | Managed CI/CD pipeline | Automating build → test → deploy on AWS |
| **IAM** | Identity and access management | Every AWS resource — controls who can do what |
| **KMS** | Managed encryption key service | Encrypting data at rest across S3, RDS, EBS, etc. |
| **Secrets Manager** | Stores and auto-rotates secrets | DB passwords, API keys, any credential |
| **Cognito** | User authentication + federation | App login, social IdP federation, JWT issuance |
| **Athena** | Serverless SQL queries over S3 data | Ad-hoc analytics on data lake without loading into a DB |
| **OpenSearch** | Managed Elasticsearch/OpenSearch cluster | Full-text search, log analytics |
| **Glue** | Serverless ETL + data catalog | Transforming and cataloging data for analytics pipelines |
