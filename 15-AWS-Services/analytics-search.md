# Analytics & Search

---

### Athena
- **What it is:** Serverless interactive query service — run standard SQL directly on data stored in S3 without loading it into a database.
- **Interviewers probe:**
  - Columnar formats (Parquet, ORC) dramatically reduce scan cost and improve performance vs CSV/JSON
  - Partitioning — organizing S3 data by date/region/etc. so Athena skips irrelevant partitions; reduces data scanned
  - Glue Data Catalog as the metastore — tables and schemas defined in Glue, queried by Athena
  - Pricing: per TB of data scanned — columnar + partitioning is the primary cost-reduction lever
- **When to use vs alternatives:** Athena for ad-hoc analytics on a data lake in S3 without managing a cluster. Use Redshift when you need consistent high-performance analytics with complex joins on structured data or need a data warehouse. Use QuickSight for BI dashboards. Athena + Glue + S3 is the minimal serverless analytics stack.
- **Rapid Q&A:**
  - *How do you reduce Athena query costs?* Convert data to Parquet/ORC, add partitions, compress files, use column pruning in SELECT.
  - *What is Athena Federated Query?* Allows Athena to query data sources beyond S3 (RDS, DynamoDB, custom) via Lambda-based connectors.
  - *What is a partition projection?* A feature that auto-generates partition metadata from a pattern, avoiding Glue partition repair for time-series data.
- **Gotchas/limits:**
  - Athena is read-only on S3 (INSERT INTO for CTAS only) — not a transactional database.
  - Large numbers of small files degrade performance — use Glue jobs to compact before querying.
  - Query results are stored in a separate S3 location — set a lifecycle rule to clean up results.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### OpenSearch
- **What it is:** Managed OpenSearch/Elasticsearch cluster service — distributed full-text search and log analytics engine.
- **Interviewers probe:**
  - Index, shards (primary + replicas), documents — the core data model
  - Query types: full-text (match, multi_match), structured (term, range), combined (bool query)
  - Ingestion: Kinesis Firehose, Logstash, Lambda, direct API; common use: centralized log analytics (ELK-style)
  - OpenSearch Serverless vs provisioned: Serverless scales automatically, pay per OCU; provisioned gives you control over instance types and shard layout
- **When to use vs alternatives:** OpenSearch for full-text search, log/metric analytics, or fuzzy/typo-tolerant search. Use RDS/DynamoDB for structured data with exact-match queries. Use Athena+S3 for batch analytics. OpenSearch is operationally heavier than Athena — justify it with search relevance requirements or real-time log analytics.
- **Rapid Q&A:**
  - *What is an inverted index?* A data structure mapping terms to the documents containing them — the foundation of fast full-text search.
  - *What is index refresh?* OpenSearch batches writes and refreshes the index (makes new docs searchable) every 1 second by default — slight write-to-search latency.
  - *What is a shard split?* Increasing the number of primary shards on an existing index — requires reindexing in OpenSearch (unlike Elasticsearch hot reindex).
- **Gotchas/limits:**
  - Mapping changes (adding a field type) cannot be made to existing indexes — requires reindex.
  - Over-sharding (too many small shards) degrades performance; aim for shard sizes of 10–50 GB.
  - OpenSearch clusters are expensive at scale — evaluate whether Athena or a simpler search solution suffices.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_

---

### Glue
- **What it is:** Serverless ETL (Extract, Transform, Load) service and data catalog — discovers schemas, transforms data, and catalogues metadata for analytics services.
- **Interviewers probe:**
  - Glue Data Catalog: central metadata repository (databases, tables, schemas); shared by Athena, Redshift Spectrum, EMR
  - Glue Crawlers: scan data sources (S3, RDS, DynamoDB) and auto-populate the Data Catalog with inferred schemas
  - Glue ETL jobs: PySpark or Python shell scripts that transform data; serverless Spark execution on DPUs (Data Processing Units)
  - Glue DataBrew: visual no-code/low-code data preparation tool for analysts
- **When to use vs alternatives:** Glue for schema discovery (crawlers), centralized metadata (catalog), and serverless ETL at scale. Use Lambda for lightweight transformations on small payloads. Use EMR when you need full Spark/Hadoop ecosystem control or cost optimization for very large jobs. Glue is the default ETL glue between S3, Athena, and Redshift in AWS analytics stacks.
- **Rapid Q&A:**
  - *What is a Glue DPU?* A Data Processing Unit — the billing and capacity unit for Glue ETL jobs; 1 DPU = 4 vCPUs + 16 GB RAM.
  - *What is a Glue Crawler partition threshold?* Crawlers detect partitions and update the catalog; run on schedule or triggered — frequent crawls on large buckets can be slow and costly.
  - *What is Glue Streaming ETL?* Glue jobs that read from Kinesis or MSK and process micro-batches continuously rather than on a schedule.
- **Gotchas/limits:**
  - Glue ETL jobs have startup latency (~1–2 min for DPU provisioning) — not suitable for real-time transforms.
  - Crawler schema inference can be wrong for irregular data — verify and manually correct catalog schemas.
  - DPU-hours are billed per second with a 1-minute minimum — small frequent jobs add up; batch them.
- **Recency:** Fundamentals stable; no recent change that affects interviews.
- **Map to my projects:** _(leave blank)_
