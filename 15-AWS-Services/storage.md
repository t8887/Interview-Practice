# Storage

---

### S3
- **What it is:** Infinitely scalable object storage — store any file as an object (key + value + metadata) in a bucket.
- **Interviewers probe:**
  - Storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant/Flexible/Deep Archive
  - Presigned URLs — grant time-limited access without exposing credentials
  - S3 event notifications → Lambda/SQS/SNS on object create/delete
  - Versioning, lifecycle rules, replication (CRR/SRR)
- **When to use vs alternatives:** S3 for objects/blobs/files at any scale. Use EBS for block storage attached to EC2. Use EFS for shared POSIX filesystem across instances. S3 is not a filesystem — no random byte-range writes, no POSIX locks.
- **Rapid Q&A:**
  - *What is a presigned URL?* A time-limited URL with embedded credentials; lets clients upload/download directly without going through your server.
  - *What is S3 Transfer Acceleration?* Routes uploads through CloudFront edge locations for faster cross-region uploads.
  - *How do you block public access?* Enable "Block Public Access" at the account or bucket level — overrides any bucket/object ACL.
  - *What is multipart upload?* Splitting large files into parts uploaded in parallel; required for objects >5 GB.
- **Gotchas/limits:**
  - Strong read-after-write consistency (since Nov 2020) — no eventual consistency surprises.
  - Max object size is 5 TB; single PUT is limited to 5 GB — use multipart for large files.
  - Bucket names are globally unique; bucket region is fixed at creation.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### EBS
- **What it is:** Network-attached block storage volumes; attached to a single EC2 instance at a time (like a virtual hard drive).
- **Interviewers probe:**
  - Volume types: gp3 (general purpose SSD, baseline 3000 IOPS), io2 Block Express (high IOPS, multi-attach), st1 (throughput HDD), sc1 (cold HDD)
  - Snapshots — incremental, stored in S3, used for backup and AMI creation
  - Multi-Attach: io1/io2 can attach to multiple instances in the same AZ (requires cluster-aware filesystem)
  - Encryption: AES-256, transparent, uses KMS CMK
- **When to use vs alternatives:** EBS when you need low-latency block I/O for a single EC2 (OS disk, RDS, single-node DB). Use instance store for highest IOPS (ephemeral, lost on stop). Use EFS when multiple EC2s need shared file access. Use S3 for object/blob storage.
- **Rapid Q&A:**
  - *What happens to an EBS volume when the instance is terminated?* The root volume is deleted by default; additional volumes persist by default (configurable).
  - *Can you increase EBS volume size without downtime?* Yes — Elastic Volumes allows resize, IOPS, and throughput changes without detaching.
  - *What is the difference between gp2 and gp3?* gp3 decouples IOPS from size (3000 IOPS baseline regardless of size) and is cheaper.
- **Gotchas/limits:**
  - EBS volumes are AZ-scoped — you cannot directly attach a volume from us-east-1a to an instance in us-east-1b.
  - Snapshot restores have I/O latency until blocks are fully initialized (use Fast Snapshot Restore to avoid).
  - gp2 IOPS are tied to volume size (3 IOPS/GB, max 16,000); gp3 is preferred for new volumes.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### EFS
- **What it is:** Managed elastic NFS (Network File System) that can be mounted on multiple EC2 instances simultaneously.
- **Interviewers probe:**
  - Mount targets per AZ — one per VPC subnet
  - Performance modes: General Purpose (default, low latency) vs Max I/O (higher throughput, higher latency)
  - Throughput modes: Elastic (auto-scales, default), Bursting (tied to storage size), Provisioned (fixed throughput)
  - Storage tiers: Standard and Infrequent Access (IA) — lifecycle policy moves files automatically
- **When to use vs alternatives:** EFS when multiple EC2 instances need shared read/write access to the same filesystem (e.g., shared CMS uploads, ML training data). Use S3 for objects and blobs — cheaper, more durable, no POSIX needed. Use EBS for single-instance block storage. EFS costs ~3× more per GB than S3.
- **Rapid Q&A:**
  - *What protocols does EFS support?* NFS v4.0 and v4.1 only — not SMB/CIFS (use FSx for Windows for that).
  - *Can Lambda use EFS?* Yes — Lambda can mount EFS access points when running inside a VPC.
  - *What is an access point?* An application-specific entry point into an EFS filesystem with enforced POSIX user/group and root directory.
- **Gotchas/limits:**
  - EFS is Regional (data replicated across AZs); mount targets must be created in each AZ you use.
  - EFS is Linux/NFS only — not compatible with Windows instances without third-party tools.
  - Throughput scales with data stored in Bursting mode; small filesystems get low baseline throughput.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
