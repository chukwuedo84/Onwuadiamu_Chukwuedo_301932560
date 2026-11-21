# Hospital / Clinic System — database design

My case study records patient, clinician, appointment.

## Users

- Synthetic clinic scheduling staff
- Synthetic clinicians reviewing their schedules

## Main operations

- Create and update appointments
- List appointments for a date range
- Summarize appointments by clinician

## Entities

| Entity | Information stored |
| --- | --- |
| patient | Stores a synthetic patient profile referenced by appointments. |
| clinician | Stores a synthetic clinician profile referenced by appointments. |
| appointment | Records a scheduled patient visit with one clinician. |

## patient

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| patient_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| birth_date | DATE |  | No |
| contact_preference | TEXT |  | Yes |


## clinician

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| clinician_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| specialty | TEXT |  | Yes |
| active | BOOLEAN |  | Yes |


## appointment

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| appointment_id | BIGINT | PK | Yes |
| patient_id | BIGINT | FK | Yes |
| clinician_id | BIGINT | FK | Yes |
| starts_at | TIMESTAMPTZ |  | Yes |
| ends_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
| reason | TEXT |  | No |
- patient_id → patient.patient_id
- clinician_id → clinician.clinician_id

## Relationships and business rules

- Every patient must have a display name.
- Every clinician must have a specialty recorded.
- Each appointment must reference an existing patient through its patient_id foreign key.
- Each appointment must reference an existing clinician through its clinician_id foreign key.
- An appointment's end time must be later than its start time.
- Appointment status must be scheduled, completed, or cancelled.
- A clinician may have at most one non-cancelled appointment at an exact start time; enforce with a partial unique index where status is not cancelled.

## Assumptions

- All identifiers are synthetic and globally unique across all three tables.
- Each appointment refers to exactly one patient and one clinician.
- Appointment timestamps use a consistent timezone.
- Cancelled appointments do not reserve a clinician's exact start time.

