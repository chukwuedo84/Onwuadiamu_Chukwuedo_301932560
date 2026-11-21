-- Hospital / Clinic System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."patient" (
  "patient_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "birth_date" date,
  "contact_preference" text NOT NULL,
  CONSTRAINT "pk_patient" PRIMARY KEY ("patient_id")
);
CREATE TABLE portfolio."clinician" (
  "clinician_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "specialty" text NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_clinician" PRIMARY KEY ("clinician_id")
);
CREATE TABLE portfolio."appointment" (
  "appointment_id" bigint NOT NULL,
  "patient_id" bigint NOT NULL,
  "clinician_id" bigint NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "ends_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  "reason" text,
  CONSTRAINT "pk_appointment" PRIMARY KEY ("appointment_id")
);
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "fk_appointment_0" FOREIGN KEY ("patient_id") REFERENCES portfolio."patient" ("patient_id");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "fk_appointment_1" FOREIGN KEY ("clinician_id") REFERENCES portfolio."clinician" ("clinician_id");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "appointment_valid_interval" CHECK ("ends_at" > "starts_at");
ALTER TABLE portfolio."appointment" ADD CONSTRAINT "appointment_valid_status" CHECK (("status" = 'scheduled') OR ("status" = 'completed') OR ("status" = 'cancelled'));
CREATE UNIQUE INDEX "active_clinician_start_unique" ON portfolio."appointment" ("clinician_id", "starts_at") WHERE (("status" = 'scheduled') OR ("status" = 'completed'));
COMMIT;
