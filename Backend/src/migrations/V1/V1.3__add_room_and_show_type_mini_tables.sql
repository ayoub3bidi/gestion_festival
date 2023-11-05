CREATE TABLE IF NOT EXISTS public.room(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name VARCHAR(200),
    capacity INTEGER,
);

CREATE TABLE IF NOT EXISTS public.show_type(
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name VARCHAR(200)
);