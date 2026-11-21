# Hospital / Clinic System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| patient_id | appointment records (list) |
| --- | --- |
| 1001 | [3001] |
| 1002 | [3002] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| appointment.appointment_id | appointment.patient_id | appointment.clinician_id | appointment.status | patient.patient_id | patient.display_name | clinician.clinician_id | clinician.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | scheduled | 1001 | Alex Morgan | 2001 | Dr. Taylor Kim |
| 3002 | 1002 | 2001 | cancelled | 1002 | Jamie Lee | 2001 | Dr. Taylor Kim |

Key: appointment_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## appointment_example

| appointment.appointment_id | appointment.patient_id | appointment.clinician_id | appointment.status | patient.patient_id | patient.display_name | clinician.clinician_id | clinician.display_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | scheduled | 1001 | Alex Morgan | 2001 | Dr. Taylor Kim |
| 3002 | 1002 | 2001 | cancelled | 1002 | Jamie Lee | 2001 | Dr. Taylor Kim |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## patient

| patient_id | display_name | birth_date | contact_preference |
| --- | --- | --- | --- |
| 1001 | Alex Morgan | 1988-04-12 | phone |
| 1002 | Jamie Lee | NULL | email |

## clinician

| clinician_id | display_name | specialty | active |
| --- | --- | --- | --- |
| 2001 | Dr. Taylor Kim | family medicine | true |
| 2002 | Dr. Sam Patel | pediatrics | true |

## appointment

| appointment_id | patient_id | clinician_id | starts_at | ends_at | status | reason |
| --- | --- | --- | --- | --- | --- | --- |
| 3001 | 1001 | 2001 | 2030-01-02T09:00:00+00:00 | 2030-01-02T09:30:00+00:00 | scheduled | Annual checkup |
| 3002 | 1002 | 2001 | 2030-01-02T09:00:00+00:00 | 2030-01-02T09:30:00+00:00 | cancelled | NULL |

## Dependencies

- patient: (patient_id) → display_name, birth_date, contact_preference
- clinician: (clinician_id) → display_name, specialty, active
- appointment: (appointment_id) → patient_id, clinician_id, starts_at, ends_at, status, reason

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
