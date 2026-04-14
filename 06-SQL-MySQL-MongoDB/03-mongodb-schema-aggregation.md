# MongoDB — Schema Design, Aggregation & Performance

## Document Model vs Relational
```
Relational (MySQL):
users → orders → order_items → products
4 JOINs for one order page

Document (MongoDB):
{
    _id: ObjectId("..."),
    name: "Onkar",
    email: "onkar@email.com",
    orders: [
        {
            orderId: "ORD-001",
            date: ISODate("2024-01-15"),
            items: [
                { productId: "P1", name: "Laptop", qty: 1, price: 999 },
                { productId: "P2", name: "Mouse", qty: 2, price: 29 }
            ],
            total: 1057
        }
    ]
}
// Single read — no joins
```

## Embedding vs Referencing

| Factor | Embed | Reference |
|---|---|---|
| Read pattern | Always read together | Read independently |
| Data size | Small, bounded | Large, unbounded |
| Update frequency | Rarely updated | Frequently updated |
| Cardinality | 1:few | 1:many, many:many |
| Document size | < 16MB limit | No concern |

### When to Embed
```javascript
// 1:FEW — User → Addresses (max 3-5)
{
    _id: ObjectId("..."),
    name: "Onkar",
    addresses: [
        { label: "Home", city: "Mumbai", zip: "400001" },
        { label: "Office", city: "Mumbai", zip: "400051" }
    ]
}

// 1:FEW — Blog Post → Comments (if bounded)
{
    _id: ObjectId("..."),
    title: "MongoDB Patterns",
    comments: [
        { author: "Tyson", text: "Great post!", date: ISODate() }
    ]
}
```

### When to Reference
```javascript
// 1:MANY — Author → Books (could be hundreds)
// Author document
{ _id: "author1", name: "Onkar", bookIds: ["book1", "book2", ...] }
// Book document
{ _id: "book1", title: "Node.js Deep Dive", authorId: "author1", ... }

// MANY:MANY — Students ↔ Courses
// Student doc
{ _id: "s1", name: "Onkar", courseIds: ["c1", "c2"] }
// Course doc
{ _id: "c1", title: "DSA", studentIds: ["s1", "s2", "s3"] }

// Lookup at query time
db.books.aggregate([
    { $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "_id",
        as: "author"
    }},
    { $unwind: "$author" }
]);
```

### Hybrid: Embed + Reference (Subset Pattern)
```javascript
// Product listing needs just name + image + price (not full details)
// Review collection (separate)
{ _id: "r1", productId: "p1", rating: 5, text: "Amazing!", author: "Tyson" }

// Product document — embed top 3 recent reviews
{
    _id: "p1",
    name: "Laptop",
    price: 999,
    recentReviews: [  // subset — only top 3
        { rating: 5, text: "Amazing!", author: "Tyson" },
        { rating: 4, text: "Good value", author: "Rahul" }
    ],
    reviewCount: 142,
    avgRating: 4.3
}
```

## Aggregation Pipeline
```javascript
// Pipeline: data flows through stages, each transforms the data
// $match → $group → $sort → $project → $limit

// Example: Total revenue per category, top 5
db.orders.aggregate([
    { $match: { status: "completed", date: { $gte: ISODate("2024-01-01") } } },
    { $unwind: "$items" },   // flatten items array
    { $group: {
        _id: "$items.category",
        totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
        orderCount: { $sum: 1 },
        avgOrderValue: { $avg: { $multiply: ["$items.price", "$items.qty"] } }
    }},
    { $sort: { totalRevenue: -1 } },
    { $limit: 5 },
    { $project: {
        category: "$_id",
        totalRevenue: { $round: ["$totalRevenue", 2] },
        orderCount: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
        _id: 0
    }}
]);
```

### Common Aggregation Stages
```javascript
// $lookup (JOIN equivalent)
{ $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"         // result is always an array
}}

// $unwind — flatten array field
{ $unwind: "$items" }
// { items: [a,b,c] } → {items: a}, {items: b}, {items: c}

// $addFields / $set — add computed fields
{ $addFields: {
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    isExpired: { $lt: ["$expiryDate", new Date()] }
}}

// $bucket — histogram
{ $bucket: {
    groupBy: "$price",
    boundaries: [0, 50, 100, 500, Infinity],
    default: "Other",
    output: { count: { $sum: 1 }, avgPrice: { $avg: "$price" } }
}}

// $facet — multiple pipelines in parallel
{ $facet: {
    priceStats: [
        { $group: { _id: null, avg: { $avg: "$price" }, max: { $max: "$price" } } }
    ],
    topProducts: [
        { $sort: { sales: -1 } },
        { $limit: 5 }
    ]
}}

// $graphLookup — recursive/hierarchical
{ $graphLookup: {
    from: "employees",
    startWith: "$managerId",
    connectFromField: "managerId",
    connectToField: "_id",
    as: "reportingChain"
}}
```

### Aggregation with Node.js (Mongoose)
```javascript
const results = await Order.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$amount" },
        count: { $sum: 1 }
    }},
    { $sort: { _id: 1 } }
]);
```

## Indexing in MongoDB
```javascript
// Single field
db.users.createIndex({ email: 1 });        // ascending
db.users.createIndex({ createdAt: -1 });    // descending

// Compound (order matters — same leftmost prefix rule as MySQL)
db.orders.createIndex({ userId: 1, status: 1, date: -1 });

// Unique
db.users.createIndex({ email: 1 }, { unique: true });

// TTL (auto-delete after expiry)
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Text index
db.articles.createIndex({ title: "text", body: "text" });
db.articles.find({ $text: { $search: "react hooks tutorial" } });

// Partial index (index only matching docs — smaller, faster)
db.orders.createIndex(
    { status: 1 },
    { partialFilterExpression: { status: "pending" } }
);

// Check existing indexes
db.collection.getIndexes();

// Explain query
db.orders.find({ userId: "u1" }).explain("executionStats");
// Look for: nReturned vs totalDocsExamined, IXSCAN vs COLLSCAN
```

## Performance Patterns
```javascript
// 1. Projection — only return needed fields
db.users.find({ status: "active" }, { name: 1, email: 1, _id: 0 });

// 2. Covered query — all fields in index, no doc fetch
db.orders.createIndex({ userId: 1, total: 1 });
db.orders.find({ userId: "u1" }, { total: 1, _id: 0 }); // covered!

// 3. Avoid $where and $regex with leading wildcard
// ❌ db.users.find({ name: { $regex: /.*onkar/i } });
// ✅ db.users.find({ name: { $regex: /^onkar/i } }); // can use index

// 4. Pagination: Use cursor-based over skip()
// ❌ Offset pagination (slow for large offsets)
db.products.find().sort({ _id: 1 }).skip(10000).limit(20);

// ✅ Cursor pagination
db.products.find({ _id: { $gt: lastSeenId } }).sort({ _id: 1 }).limit(20);

// 5. Bulk operations
const bulk = db.products.initializeUnorderedBulkOp();
updates.forEach(u => bulk.find({ _id: u.id }).updateOne({ $set: { price: u.price } }));
await bulk.execute();
```

## Schema Design Patterns

### Bucket Pattern (Time-series data)
```javascript
// Instead of one doc per reading → bucket by hour
{
    sensorId: "temp-01",
    date: ISODate("2024-01-15T10:00:00Z"),
    readings: [
        { ts: ISODate("2024-01-15T10:00:00Z"), value: 22.5 },
        { ts: ISODate("2024-01-15T10:01:00Z"), value: 22.7 },
        // ... 60 readings per doc
    ],
    count: 60,
    sum: 1350,
    avg: 22.5
}
```

### Computed Pattern (Pre-aggregate)
```javascript
// Maintain running stats on write
db.products.updateOne(
    { _id: productId },
    {
        $inc: { reviewCount: 1, ratingSum: newRating },
        $push: { recentReviews: { $each: [newReview], $slice: -3 } }
    }
);
// Read: avgRating = ratingSum / reviewCount (no aggregation needed)
```

## Interview Questions

**Q: When would you embed vs reference in MongoDB?**
> Embed when data is always read together, bounded in size, and rarely updated independently (e.g., user addresses). Reference when data is large/unbounded, accessed independently, or shared across documents (e.g., products in orders).

**Q: How does MongoDB handle transactions?**
> Since 4.0: multi-document ACID transactions across replica sets. Since 4.2: across sharded clusters. Use them for operations that must be atomic across multiple documents. Keep transactions short — long transactions increase lock contention.

**Q: Explain the aggregation pipeline.**
> A series of stages that transform documents. Data flows through $match (filter), $group (aggregate), $sort, $project (reshape), $lookup (join), etc. The pipeline optimizer reorders stages when possible (e.g., moves $match before $sort). Think of it as SQL SELECT/GROUP BY/JOIN expressed as a pipeline.

**Q: How do you handle pagination in MongoDB for millions of records?**
> Cursor-based pagination using the last seen `_id` or a sorted field: `find({ _id: { $gt: lastId } }).limit(pageSize)`. Avoid `skip()` for large offsets — it scans and discards skipped documents.

**Q: How do you design a MongoDB schema for an e-commerce platform?**
> Products: standalone collection. Users: embed addresses, reference orders. Orders: reference user + embed order items (snapshot of product at purchase time — name, price, qty). Reviews: separate collection referencing product. Use the subset pattern to embed top reviews in product docs.

## Practice
1. Design a schema for a social media app (users, posts, comments, likes, follows)
2. Write an aggregation to find the most active users (by post count) per month
3. Implement cursor-based pagination with sorting by date
4. Write a pipeline to find products where avg rating dropped in the last 30 days
