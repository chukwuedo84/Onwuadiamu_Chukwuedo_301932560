-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. pk patient test. Expected: pk_patient, SQLSTATE 23505.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference")
VALUES (1001, 'Casey Rivera', '1990-06-15', 'email');

-- 2. nn patient id test. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference")
VALUES (NULL, 'Casey Rivera', '1990-06-15', 'email');

-- 3. nn patient name test. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference")
VALUES (9001, NULL, '1990-06-15', 'email');

-- 4. nn patient contact test. Expected: contact_preference, SQLSTATE 23502.
INSERT INTO portfolio."patient" ("patient_id", "display_name", "birth_date", "contact_preference")
VALUES (9002, 'Casey Rivera', '1990-06-15', NULL);

-- 5. pk clinician test. Expected: pk_clinician, SQLSTATE 23505.
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active")
VALUES (2001, 'Dr. Morgan Chen', 'cardiology', TRUE);

-- 6. nn clinician id test. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active")
VALUES (NULL, 'Dr. Morgan Chen', 'cardiology', TRUE);

-- 7. nn clinician name test. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active")
VALUES (9003, NULL, 'cardiology', TRUE);

-- 8. nn clinician specialty test. Expected: specialty, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active")
VALUES (9004, 'Dr. Morgan Chen', NULL, TRUE);

-- 9. nn clinician active test. Expected: active, SQLSTATE 23502.
INSERT INTO portfolio."clinician" ("clinician_id", "display_name", "specialty", "active")
VALUES (9005, 'Dr. Morgan Chen', 'cardiology', NULL);

-- 10. pk appointment test. Expected: pk_appointment, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (3001, 1002, 2002, '2030-01-03T11:00:00Z', '2030-01-03T11:30:00Z', 'scheduled', 'Follow-up');

-- 11. fk appointment patient test. Expected: fk_appointment_0, SQLSTATE 23503.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9006, 99001, 2002, '2030-01-03T11:00:00Z', '2030-01-03T11:30:00Z', 'scheduled', 'Follow-up');

-- 12. fk appointment clinician test. Expected: fk_appointment_1, SQLSTATE 23503.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9007, 1002, 99002, '2030-01-03T12:00:00Z', '2030-01-03T12:30:00Z', 'scheduled', 'Follow-up');

-- 13. nn appointment id test. Expected: appointment_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (NULL, 1002, 2002, '2030-01-03T13:00:00Z', '2030-01-03T13:30:00Z', 'scheduled', 'Follow-up');

-- 14. nn appointment patient test. Expected: patient_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9008, NULL, 2002, '2030-01-03T14:00:00Z', '2030-01-03T14:30:00Z', 'scheduled', 'Follow-up');

-- 15. nn appointment clinician test. Expected: clinician_id, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9009, 1002, NULL, '2030-01-03T15:00:00Z', '2030-01-03T15:30:00Z', 'scheduled', 'Follow-up');

-- 16. nn appointment starts test. Expected: starts_at, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9010, 1002, 2002, NULL, '2030-01-03T16:30:00Z', 'scheduled', 'Follow-up');

-- 17. nn appointment ends test. Expected: ends_at, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9011, 1002, 2002, '2030-01-03T17:00:00Z', NULL, 'scheduled', 'Follow-up');

-- 18. nn appointment status test. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9012, 1002, 2002, '2030-01-03T18:00:00Z', '2030-01-03T18:30:00Z', NULL, 'Follow-up');

-- 19. check appointment interval test. Expected: appointment_valid_interval, SQLSTATE 23514.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9013, 1002, 2002, '2030-01-03T19:30:00Z', '2030-01-03T19:00:00Z', 'scheduled', 'Follow-up');

-- 20. check appointment status test. Expected: appointment_valid_status, SQLSTATE 23514.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9014, 1002, 2002, '2030-01-03T20:00:00Z', '2030-01-03T20:30:00Z', 'pending', 'Follow-up');

-- 21. partial unique appointment test. Expected: active_clinician_start_unique, SQLSTATE 23505.
INSERT INTO portfolio."appointment" ("appointment_id", "patient_id", "clinician_id", "starts_at", "ends_at", "status", "reason")
VALUES (9015, 1002, 2001, '2030-01-02T09:00:00Z', '2030-01-02T10:00:00Z', 'scheduled', 'Follow-up');
