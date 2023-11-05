CREATE TABLE IF NOT EXISTS public.show (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name VARCHAR(200),
    date VARCHAR(200),
    time VARCHAR(200),
    duration INTEGER,
    reserved_seats INTEGER,
    available_seats INTEGER,
    room_name VARCHAR(200),
    show_type VARCHAR(200),
    price_normal numeric(10, 2)
    price_reduced numeric(10, 2),
    price_collective numeric(10, 2),
    is_exceptional BOOLEAN,
    is_available BOOLEAN,
    room_id uuid REFERENCES public.room(id)
    show_type_id uuid REFERENCES public.show_type(id),
)