# Security

---

### IAM
- **What it is:** Identity and Access Management — controls authentication (who) and authorization (what) for every AWS API call.
- **Interviewers probe:**
  - Users, Groups, Roles, Policies — roles are assumed by services/principals, not long-term credentials
  - Policy evaluation: explicit Deny > explicit Allow > implicit Deny; SCPs (Service Control Policies) add org-level guardrails
  - Least privilege: grant only the permissions needed; use condition keys (aws:SourceIP, aws:RequestedRegion) to narrow scope
  - STS AssumeRole — cross-account access, temporary credentials, instance profiles for EC2/Lambda
- **When to use vs alternatives:** IAM is mandatory for everything on AWS. The interview question is about *design*: use roles over long-term access keys, use instance profiles instead of embedding credentials in code, use permission boundaries to delegate safely. AWS Organizations + SCPs for guardrails across accounts.
- **Rapid Q&A:**
  - *What is an instance profile?* A container for an IAM role that can be attached to an EC2 instance; the instance gets temporary credentials via IMDS.
  - *What is a permission boundary?* An IAM policy attached to a user/role that sets the maximum permissions they can ever have — even if their identity policy grants more.
  - *What is the difference between identity-based and resource-based policies?* Identity-based are attached to principals; resource-based are attached to resources (S3 bucket policy, SQS queue policy) and grant cross-account access directly.
  - *What are IAM Access Analyzer findings?* Identifies resources shared with external principals — helps find unintended public or cross-account access.
- **Gotchas/limits:**
  - Root account credentials should never be used for daily operations — enable MFA and lock them away.
  - IAM policies are evaluated per-API-call; a missing permission causes an immediate 403 — there is no "almost allowed."
  - Access key rotation is your responsibility for IAM users — prefer roles and short-lived credentials.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### KMS
- **What it is:** Key Management Service — creates, stores, and manages cryptographic keys; provides a simple API for encrypt/decrypt operations integrated with all AWS services.
- **Interviewers probe:**
  - AWS managed keys (auto-created per service, you can't manage) vs customer managed keys (CMKs — you control rotation, policy, grants)
  - Envelope encryption: KMS generates a data key; your app uses the data key to encrypt data locally; KMS only encrypts/decrypts the data key
  - Key policies vs IAM policies — key policy is the primary access control for a CMK; IAM can supplement but cannot override a key policy that excludes IAM
  - Automatic key rotation — once per year for CMKs; does not re-encrypt existing data (old key versions retained for decryption)
- **When to use vs alternatives:** KMS for encryption of data at rest across S3, RDS, EBS, DynamoDB, Secrets Manager. Use CloudHSM when you need dedicated hardware (FIPS 140-2 Level 3), customer-managed key material, or compliance requirements that preclude shared HSMs. KMS is multi-tenant HSM — sufficient for most use cases.
- **Rapid Q&A:**
  - *What is envelope encryption?* Encrypt data with a local plaintext data key; encrypt that data key with KMS CMK. Only the encrypted data key is stored alongside the data.
  - *What is a KMS grant?* A mechanism to programmatically delegate specific key operations to a principal without modifying the key policy — useful for temporary access.
  - *Can you import key material into KMS?* Yes — bring your own key (BYOK) allows importing externally generated key material.
- **Gotchas/limits:**
  - KMS API calls are rate-limited (5,500–30,000 requests/sec depending on region) — for high-throughput encryption, cache data keys locally.
  - CMK deletion has a mandatory waiting period (7–30 days) and is irreversible — data encrypted with a deleted key is unrecoverable.
  - KMS keys are regional — you cannot use a key from us-east-1 to decrypt data in eu-west-1.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Secrets Manager
- **What it is:** Managed service for storing, rotating, and retrieving secrets (DB passwords, API keys, OAuth tokens) with automatic rotation support.
- **Interviewers probe:**
  - Automatic rotation — Lambda function rotates secrets on a schedule; built-in rotation for RDS, Redshift, DocumentDB
  - Secret versioning: AWSCURRENT, AWSPENDING, AWSPREVIOUS staging labels — ensures zero-downtime rotation
  - Cross-account access via resource-based policies
  - Integration with RDS: Secrets Manager can create and manage the DB master password, rotating it automatically
- **When to use vs alternatives:** Secrets Manager for secrets that need automatic rotation and audit trail. Use SSM Parameter Store SecureString for non-rotating config values — cheaper (~$0 for standard params vs $0.40/secret/month for Secrets Manager) [VERIFY-2026]. Never use environment variables or hardcoded values for secrets in code.
- **Rapid Q&A:**
  - *What is the rotation Lambda contract?* Four steps: createSecret (generate new), setSecret (set on target), testSecret (validate), finishSecret (mark AWSCURRENT).
  - *How do applications retrieve secrets without caching issues during rotation?* Use the Secrets Manager SDK with caching client — it handles AWSPENDING/AWSCURRENT transitions transparently.
  - *What is the difference between Secrets Manager and Parameter Store?* Secrets Manager: auto-rotation, secret-specific audit, higher cost. Parameter Store: simpler, cheaper, supports hierarchical config, no built-in rotation.
- **Gotchas/limits:**
  - Rotation temporarily creates two valid credential versions — applications must handle both during the rotation window.
  - Secret deletion has a recovery window (default 30 days) before permanent deletion.
  - High-volume secret retrievals should use the caching client to avoid throttling and reduce API costs.
- **Recency:** Pricing [VERIFY-2026]; rotation mechanics stable.
- **Map to my projects:** _(leave blank)_

---

### Cognito
- **What it is:** Managed user authentication and authorization service — User Pools for user directory/authentication, Identity Pools for granting AWS credentials to authenticated users.
- **Interviewers probe:**
  - User Pools: sign-up/sign-in, MFA, hosted UI, JWT tokens (access/ID/refresh); app clients
  - Identity Pools (Federated Identities): exchanges a token (Cognito, Google, SAML) for temporary AWS credentials via STS
  - User Pool triggers: Lambda hooks for pre-sign-up, post-confirmation, pre-token-generation, custom auth flows
  - OIDC and SAML federation — integrate enterprise IdPs without managing user records in Cognito
- **When to use vs alternatives:** Cognito User Pools for simple app authentication needing OAuth2/OIDC without building it yourself. Use Auth0/Okta when you need richer identity features, enterprise SSO, or multi-tenant isolation not available in Cognito. Identity Pools for granting end-users direct (scoped) AWS resource access (e.g., uploading to their own S3 prefix).
- **Rapid Q&A:**
  - *What tokens does Cognito User Pool issue?* ID token (user identity claims), access token (authorization scopes), refresh token (long-lived, used to get new access/ID tokens).
  - *What is a Cognito app client?* A configuration that defines allowed OAuth flows, callback URLs, and scopes for a specific application connecting to the User Pool.
  - *What is the difference between User Pools and Identity Pools?* User Pools = authentication (who are you?); Identity Pools = authorization (what AWS resources can you access?).
- **Gotchas/limits:**
  - Cognito User Pools cannot be merged across regions — plan region strategy before launch.
  - JWT verification must be done by your application using the JWKS endpoint — do not trust tokens without verification.
  - Cognito has throttling limits on API calls per user pool — high-volume auth flows need rate limiting or custom auth flows.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
