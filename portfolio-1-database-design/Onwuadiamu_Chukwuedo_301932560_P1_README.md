# Portfolio 1 — Database Design and Modelling

I organised the data into patient, clinician, appointment. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| patient | 2 |
| clinician | 2 |
| appointment | 2 |

The 21 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Onwuadiamu_Chukwuedo_301932560_P1_Design.md)
- [ER diagram](Onwuadiamu_Chukwuedo_301932560_P1_ERDiagram.md)
- [Normalisation](Onwuadiamu_Chukwuedo_301932560_P1_Normalisation.md)
- [Schema](Onwuadiamu_Chukwuedo_301932560_P1_Schema.sql)
- [Sample data](Onwuadiamu_Chukwuedo_301932560_P1_SampleData.sql)
- [Constraint tests](Onwuadiamu_Chukwuedo_301932560_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Onwuadiamu_Chukwuedo_301932560_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

