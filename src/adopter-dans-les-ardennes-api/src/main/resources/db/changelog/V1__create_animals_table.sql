create table animals
(
    id BIGSERIAL primary key,
    code text not null,
    name text not null,
    image_url text,
    breed text,
    arrival_date varchar(255),
    gender varchar(255) not null,
    age text not null,
    vaccinated boolean not null,
    castrated boolean not null,
    wormed boolean not null,
    electronic_chip text,
    illness text,
    notes text,
    is_available boolean not null
);
