# Networking

---

### VPC
- **What it is:** Virtual Private Cloud — logically isolated network in AWS where you launch resources with full control over IP ranges, subnets, routing, and firewalls.
- **Interviewers probe:**
  - Public subnet (route to Internet Gateway) vs private subnet (route to NAT Gateway/no internet)
  - Security Groups (stateful, instance-level) vs NACLs (stateless, subnet-level)
  - VPC Peering vs Transit Gateway (peering is 1:1 non-transitive; TGW is a hub for many VPCs)
  - VPC Endpoints (Interface = PrivateLink; Gateway = S3/DynamoDB) — keep traffic off public internet
- **When to use vs alternatives:** Every production workload runs inside a VPC. The interview question is about *design*: how to segment public/private tiers, how to connect VPCs, how to restrict egress. Default VPC is fine for dev; production should use custom VPCs with planned CIDR ranges.
- **Rapid Q&A:**
  - *What is a NAT Gateway?* Allows private subnet instances to initiate outbound internet connections without being directly reachable from the internet.
  - *What is the difference between SG and NACL?* SG is stateful (return traffic auto-allowed), attached to ENIs; NACL is stateless, evaluated in rule-number order, applied to subnets.
  - *What is VPC Flow Logs?* Captures IP traffic metadata (not payload) for network analysis and security auditing.
  - *What is a Bastion Host?* An EC2 in a public subnet used as a jump box to SSH into private subnet instances.
- **Gotchas/limits:**
  - VPC CIDR cannot be changed after creation — plan address space carefully.
  - VPC Peering is non-transitive: A↔B and B↔C does not allow A↔C.
  - NAT Gateway is per-AZ; use one per AZ for HA (and pay per AZ).
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Route 53
- **What it is:** AWS's scalable DNS service and domain registrar; also provides health checks and intelligent traffic routing.
- **Interviewers probe:**
  - Routing policies: Simple, Weighted, Latency-based, Geolocation, Geoproximity, Failover, Multivalue Answer
  - Health checks — trigger failover routing when an endpoint is unhealthy
  - Alias records vs CNAME: Alias points to AWS resources (free, works at zone apex); CNAME is standard DNS (costs per query, can't be used at root domain)
  - Private hosted zones — DNS resolution within a VPC
- **When to use vs alternatives:** Route 53 for DNS when already on AWS. The interview question is usually about which routing policy to use: latency-based for global performance, failover for DR, weighted for blue/green or canary deploys.
- **Rapid Q&A:**
  - *What is the zone apex?* The root domain (e.g., example.com) — CNAMEs are not allowed here; use Alias records instead.
  - *How does failover routing work?* Primary record is returned when healthy; Route 53 automatically switches to secondary when health check fails.
  - *What is Geoproximity routing?* Routes based on geographic distance, with a bias value to shift traffic boundaries.
- **Gotchas/limits:**
  - DNS TTL controls how long resolvers cache records — low TTL enables fast failover but increases query cost.
  - Health checks for private resources require a CloudWatch alarm health check (not direct endpoint check).
  - Route 53 Resolver is separate from public Route 53 — used for DNS resolution between VPCs and on-premises.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### CloudFront
- **What it is:** AWS's global CDN — caches content at 400+ edge locations worldwide to reduce latency and offload origin traffic.
- **Interviewers probe:**
  - Origins: S3, ALB, EC2, API Gateway, custom HTTP endpoint
  - Cache behaviors: path-pattern rules, cache policies (TTL, headers, query strings to forward)
  - Signed URLs vs Signed Cookies — restrict access to content
  - Lambda@Edge and CloudFront Functions — run code at the edge for auth, redirects, A/B testing
- **When to use vs alternatives:** CloudFront for any content needing global low-latency delivery (static assets, APIs, video). S3 + CloudFront is the standard pattern for static websites. Use CloudFront in front of API Gateway or ALB to add caching, WAF, and geo-restriction. Not a replacement for a CDN-native provider if you need non-AWS edge compute.
- **Rapid Q&A:**
  - *How do you invalidate CloudFront cache?* Create an invalidation with a path pattern (e.g., `/*`); costs per invalidation path beyond 1000/month.
  - *What is origin shield?* An additional caching layer between edge locations and the origin to reduce origin load.
  - *What is the difference between Lambda@Edge and CloudFront Functions?* CF Functions are lighter (sub-ms, JS only, viewer request/response only); Lambda@Edge is heavier (Node/Python, all four event types, higher latency).
- **Gotchas/limits:**
  - CloudFront distributions take 10–20 minutes to fully deploy globally.
  - Cache-Control headers from origin control TTL — misconfigured origins can cause stale content.
  - Geo-restriction blocks by country at the distribution level — not fine-grained per path.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### ELB — ALB / NLB
- **What it is:** Elastic Load Balancing distributes traffic across targets. ALB (Application LB) operates at Layer 7 (HTTP/HTTPS). NLB (Network LB) operates at Layer 4 (TCP/UDP).
- **Interviewers probe:**
  - ALB: path-based and host-based routing, listener rules, target groups (EC2, ECS, Lambda, IP)
  - NLB: static IP per AZ, ultra-low latency, supports TCP/UDP/TLS, preserves source IP
  - Connection draining (deregistration delay) — allows in-flight requests to complete before deregistering targets
  - ALB WAF integration, sticky sessions (application-based vs duration-based cookies)
- **When to use vs alternatives:** ALB for HTTP/HTTPS web apps and microservices — richer routing, WebSocket, gRPC support. NLB for high-performance TCP/UDP, static IPs, or when you need to preserve client IP natively. Classic LB (ELB v1) is deprecated — never choose it for new deployments. API Gateway replaces ALB for serverless API front-doors.
- **Rapid Q&A:**
  - *What is a target group?* A logical group of targets (EC2, ECS tasks, IP addresses, Lambda) that a load balancer routes requests to.
  - *What is the deregistration delay?* A waiting period (default 300s) during which the LB stops sending new requests to a deregistering target but allows existing connections to complete.
  - *Can an ALB route to Lambda?* Yes — Lambda is a supported target type for ALB target groups.
- **Gotchas/limits:**
  - ALB does not preserve client IP natively — use `X-Forwarded-For` header; NLB preserves source IP at Layer 4.
  - Cross-zone load balancing is enabled by default on ALB (distributes evenly across all AZ targets); disabled by default on NLB (costs extra when enabled).
  - ALB has a fixed 60-second idle timeout for connections; NLB has a fixed 350-second TCP idle timeout.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### API Gateway
- **What it is:** Fully managed service for creating, publishing, and securing HTTP, REST, and WebSocket APIs at any scale.
- **Interviewers probe:**
  - REST API vs HTTP API vs WebSocket API: HTTP API is cheaper/faster/less features; REST API has usage plans, caching, request validation
  - Lambda proxy integration — entire request forwarded as-is; Lambda returns full HTTP response object
  - Stages and stage variables, canary deployments via stage traffic splitting
  - Throttling: account-level default 10,000 RPS, burst 5,000; per-stage and per-method overrides
- **When to use vs alternatives:** API Gateway + Lambda is the standard serverless API pattern. Use HTTP API (not REST API) for new Lambda/HTTP backends — lower latency, lower cost. Use ALB instead if you already have EC2/ECS targets and don't need API management features. Use AppSync instead for GraphQL.
- **Rapid Q&A:**
  - *What is a usage plan?* Throttling and quota settings applied to an API key — used for rate-limiting external API consumers.
  - *What is request/response mapping?* VTL templates in REST API that transform request/response shapes between client and integration target.
  - *What is the difference between edge-optimized and regional API?* Edge-optimized routes through CloudFront edge; regional keeps traffic in the region — use regional when you put your own CloudFront in front.
  - *What is the max timeout for API Gateway?* 29 seconds — Lambda must respond within 29s or Gateway returns 504.
- **Gotchas/limits:**
  - 29-second hard integration timeout — cannot be increased; design Lambda to respond quickly or use async patterns.
  - REST API caching is per-stage and costs extra; HTTP API does not support caching natively.
  - WebSocket API requires custom connection management (store connection IDs in DynamoDB).
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
