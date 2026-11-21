# Hospital / Clinic System — SQL queries

## 1. Show related appointment, patient, clinician records (up to 20).

```sql
SELECT t0."appointment_id" AS "appointment_appointment_id",
       t0."starts_at" AS "appointment_starts_at",
       t1."patient_id" AS "patient_patient_id",
       t1."display_name" AS "patient_display_name",
       t2."clinician_id" AS "clinician_clinician_id",
       t2."display_name" AS "clinician_display_name"
FROM portfolio."appointment" t0
JOIN portfolio."patient" t1 ON t0."patient_id" = t1."patient_id"
JOIN portfolio."clinician" t2 ON t0."clinician_id" = t2."clinician_id"
ORDER BY t0."appointment_id", t1."patient_id", t2."clinician_id"
LIMIT 20;
```

| appointment_appointment_id | appointment_starts_at | patient_patient_id | patient_display_name | clinician_clinician_id | clinician_display_name |
| --- | --- | --- | --- | --- | --- |
| 3001 | 2030-01-02T09:00:00+00:00 | 1001 | Alex Morgan | 2001 | Dr. Taylor Kim |
| 3002 | 2030-01-02T09:00:00+00:00 | 1002 | Jamie Lee | 2001 | Dr. Taylor Kim |

## 2. Find appointment records where starts_at matches "2030-01-02T09:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."appointment"
WHERE "starts_at" IS NOT DISTINCT FROM '2030-01-02T09:00:00Z'
ORDER BY "appointment_id"
LIMIT 20;
```

| appointment_id | patient_id | clinician_id | starts_at | ends_at | status | reason |
| --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | 2030-01-02T09:00:00+00:00 | 2030-01-02T09:30:00+00:00 | scheduled | Annual checkup |
| 3002 | 1002 | 2001 | 2030-01-02T09:00:00+00:00 | 2030-01-02T09:30:00+00:00 | cancelled | NULL |

## 3. Count appointment records for each patient_id (up to 20 groups).

```sql
SELECT "patient_id", count(*) AS record_count
FROM portfolio."appointment"
GROUP BY "patient_id"
ORDER BY record_count DESC, "patient_id" NULLS LAST
LIMIT 20;
```

| patient_id | record_count |
| --- | --- |
| 1001 | 1 |
| 1002 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.99 | 0.983, 0.99, 0.998 | Sort → Seq Scan | 112 |
| After index | 0.198 | 0.206, 0.182, 0.198 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 0.99 ms to 0.198 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.947..0.949 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.042..0.917 rows=20 loops=1)
Planning Time: 0.302 ms
Execution Time: 0.983 ms
```

### Before index, run 2

```text
Sort (actual time=0.97..0.971 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.015..0.939 rows=20 loops=1)
Planning Time: 0.306 ms
Execution Time: 0.99 ms
```

### Before index, run 3

```text
Sort (actual time=0.977..0.979 rows=20 loops=1)
  Seq Scan on appointment (actual time=0.015..0.946 rows=20 loops=1)
Planning Time: 0.34 ms
Execution Time: 0.998 ms
```

### After index, run 1

```text
Sort (actual time=0.134..0.136 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.028..0.099 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.467 ms
Execution Time: 0.206 ms
```

### After index, run 2

```text
Sort (actual time=0.13..0.132 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.027..0.097 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.014 rows=20 loops=1)
Planning Time: 0.479 ms
Execution Time: 0.182 ms
```

### After index, run 3

```text
Sort (actual time=0.128..0.129 rows=20 loops=1)
  Bitmap Heap Scan on appointment (actual time=0.027..0.094 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=20 loops=1)
Planning Time: 0.468 ms
Execution Time: 0.198 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Onwuadiamu_Chukwuedo_301932560_P2_Queries.sql, then Onwuadiamu_Chukwuedo_301932560_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Onwuadiamu_Chukwuedo_301932560_P2_QueryResults.png) · [Index comparison](screenshots/Onwuadiamu_Chukwuedo_301932560_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

