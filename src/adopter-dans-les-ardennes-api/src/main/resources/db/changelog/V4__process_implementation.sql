CREATE TABLE schedules
(
    id                BIGSERIAL PRIMARY KEY,
    days              INTEGER[] NOT NULL,
    start_time_hour   INTEGER   NOT NULL,
    start_time_minute INTEGER   NOT NULL,
    end_time_hour     INTEGER   NOT NULL,
    end_time_minute   INTEGER   NOT NULL
);

CREATE TABLE volunteers
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    notes       TEXT,
    email       TEXT,
    phone       TEXT,
    address     TEXT,
    image_url   TEXT,
    schedule_id BIGSERIAL REFERENCES schedules (id),
    FOREIGN KEY (schedule_id) REFERENCES schedules (id)
);

CREATE TABLE adoption_process
(
    id              BIGSERIAL primary key,
    process_number  TEXT NOT NULL,
    adopter_id      BIGSERIAL REFERENCES adopters (id),
    animal_id       BIGSERIAL REFERENCES animals (id),
    volunteer_id    BIGSERIAL REFERENCES volunteers (id),
    inspection_date TIMESTAMP,
    notify_adopter  BOOLEAN,
    feedback_notes  TEXT,
    approval_notes  TEXT,
    status          TEXT NOT NULL,
    FOREIGN KEY (adopter_id) REFERENCES adopters (id),
    FOREIGN KEY (animal_id) REFERENCES animals (id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteers (id)
);

CREATE TABLE shelter_visit
(
    id          BIGSERIAL primary key,
    schedule_id BIGSERIAL REFERENCES schedules (id),
    adopter_id  BIGSERIAL REFERENCES adopters (id),
    animal_id   BIGSERIAL REFERENCES animals (id),
    FOREIGN KEY (schedule_id) REFERENCES schedules (id),
    FOREIGN KEY (adopter_id) REFERENCES adopters (id),
    FOREIGN KEY (animal_id) REFERENCES animals (id)
);
