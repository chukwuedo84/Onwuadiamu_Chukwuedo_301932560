-- Fictional sample records for Hospital / Clinic System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference") VALUES (1001, 'Alex Morgan', '1988-04-12', 'phone');
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference") VALUES (1002, 'Jamie Lee', NULL, 'email');
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active") VALUES (2001, 'Dr. Taylor Kim', 'family medicine', TRUE);
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active") VALUES (2002, 'Dr. Sam Patel', 'pediatrics', TRUE);
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason") VALUES (3001, 1001, 2001, '2030-01-02T09:00:00Z', '2030-01-02T09:30:00Z', 'scheduled', 'Annual checkup');
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason") VALUES (3002, 1002, 2001, '2030-01-02T09:00:00Z', '2030-01-02T09:30:00Z', 'cancelled', NULL);
COMMIT;
