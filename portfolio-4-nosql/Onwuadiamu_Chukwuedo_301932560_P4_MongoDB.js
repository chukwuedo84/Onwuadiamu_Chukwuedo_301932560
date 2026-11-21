// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("appointment_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("appointment_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "appointment_created",
                    "appointment_rescheduled"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "appointment"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "appointment_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("appointment_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 3001
            },
            "snapshot": {
                "appointment_id": 3001,
                "patient_id": 1001,
                "clinician_id": 2001,
                "starts_at": "2030-01-02T09:00:00Z",
                "ends_at": "2030-01-02T09:30:00Z",
                "status": "scheduled",
                "reason": "Annual checkup"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1001
                    },
                    "snapshot": {
                        "patient_id": 1001,
                        "display_name": "Alex Morgan",
                        "birth_date": "1988-04-12",
                        "contact_preference": "phone"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 2001
                    },
                    "snapshot": {
                        "clinician_id": 2001,
                        "display_name": "Dr. Taylor Kim",
                        "specialty": "family medicine",
                        "active": true
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 3001
            },
            "snapshot": {
                "appointment_id": 3001,
                "patient_id": 1001,
                "clinician_id": 2001,
                "starts_at": "2030-01-02T09:00:00Z",
                "ends_at": "2030-01-02T09:30:00Z",
                "status": "scheduled",
                "reason": "Annual checkup"
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1001
                    },
                    "snapshot": {
                        "patient_id": 1001,
                        "display_name": "Alex Morgan",
                        "birth_date": "1988-04-12",
                        "contact_preference": "phone"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 2001
                    },
                    "snapshot": {
                        "clinician_id": 2001,
                        "display_name": "Dr. Taylor Kim",
                        "specialty": "family medicine",
                        "active": true
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "reschedule_reason": "illustrative reschedule_reason",
                "cancellation_reason": "illustrative cancellation_reason",
                "completion_note": "illustrative completion_note"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 3002
            },
            "snapshot": {
                "appointment_id": 3002,
                "patient_id": 1002,
                "clinician_id": 2001,
                "starts_at": "2030-01-02T09:00:00Z",
                "ends_at": "2030-01-02T09:30:00Z",
                "status": "cancelled",
                "reason": null
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1002
                    },
                    "snapshot": {
                        "patient_id": 1002,
                        "display_name": "Jamie Lee",
                        "birth_date": null,
                        "contact_preference": "email"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 2001
                    },
                    "snapshot": {
                        "clinician_id": 2001,
                        "display_name": "Dr. Taylor Kim",
                        "specialty": "family medicine",
                        "active": true
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "appointment_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "appointment",
            "key": {
                "appointment_id": 3002
            },
            "snapshot": {
                "appointment_id": 3002,
                "patient_id": 1002,
                "clinician_id": 2001,
                "starts_at": "2030-01-02T09:00:00Z",
                "ends_at": "2030-01-02T09:30:00Z",
                "status": "cancelled",
                "reason": null
            }
        },
        "embedded": {
            "patient": [
                {
                    "key": {
                        "patient_id": 1002
                    },
                    "snapshot": {
                        "patient_id": 1002,
                        "display_name": "Jamie Lee",
                        "birth_date": null,
                        "contact_preference": "email"
                    },
                    "via": [
                        "appointment.patient_id → patient"
                    ]
                }
            ],
            "clinician": [
                {
                    "key": {
                        "clinician_id": 2001
                    },
                    "snapshot": {
                        "clinician_id": 2001,
                        "display_name": "Dr. Taylor Kim",
                        "specialty": "family medicine",
                        "active": true
                    },
                    "via": [
                        "appointment.clinician_id → clinician"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "reschedule_reason": "illustrative reschedule_reason",
                "cancellation_reason": "illustrative cancellation_reason",
                "completion_note": "illustrative completion_note"
            }
        }
    }
]));
  await db.getCollection("appointment_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("appointment_events").find({"eventType":"appointment_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("appointment_events").find({"source.key.appointment_id":3001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("appointment_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("appointment_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("appointment_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointment",
        "key": {
            "appointment_id": 3001
        },
        "snapshot": {
            "appointment_id": 3001,
            "patient_id": 1001,
            "clinician_id": 2001,
            "starts_at": "2030-01-02T09:00:00Z",
            "ends_at": "2030-01-02T09:30:00Z",
            "status": "scheduled",
            "reason": "Annual checkup"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 1001
                },
                "snapshot": {
                    "patient_id": 1001,
                    "display_name": "Alex Morgan",
                    "birth_date": "1988-04-12",
                    "contact_preference": "phone"
                },
                "via": [
                    "appointment.patient_id → patient"
                ]
            }
        ],
        "clinician": [
            {
                "key": {
                    "clinician_id": 2001
                },
                "snapshot": {
                    "clinician_id": 2001,
                    "display_name": "Dr. Taylor Kim",
                    "specialty": "family medicine",
                    "active": true
                },
                "via": [
                    "appointment.clinician_id → clinician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("appointment_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "appointment_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "appointment",
        "key": {
            "appointment_id": 3001
        },
        "snapshot": {
            "appointment_id": 3001,
            "patient_id": 1001,
            "clinician_id": 2001,
            "starts_at": "2030-01-02T09:00:00Z",
            "ends_at": "2030-01-02T09:30:00Z",
            "status": "scheduled",
            "reason": "Annual checkup"
        }
    },
    "embedded": {
        "patient": [
            {
                "key": {
                    "patient_id": 1001
                },
                "snapshot": {
                    "patient_id": 1001,
                    "display_name": "Alex Morgan",
                    "birth_date": "1988-04-12",
                    "contact_preference": "phone"
                },
                "via": [
                    "appointment.patient_id → patient"
                ]
            }
        ],
        "clinician": [
            {
                "key": {
                    "clinician_id": 2001
                },
                "snapshot": {
                    "clinician_id": 2001,
                    "display_name": "Dr. Taylor Kim",
                    "specialty": "family medicine",
                    "active": true
                },
                "via": [
                    "appointment.clinician_id → clinician"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("appointment_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
