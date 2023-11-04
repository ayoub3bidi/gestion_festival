CREATE TABLE IF NOT EXISTS public.show (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    date VARCHAR(200),
    time VARCHAR(200),
    duration INTEGER,
    current_capacity INTEGER,
    show_type VARCHAR(200),
    price_normal INTEGER,
    price_reduced INTEGER,
    price_collective INTEGER,
    user_id uuid REFERENCES public.user(id),
    show_type_id uuid REFERENCES public.show_type(id),
    room_id uuid REFERENCES public.room(id)
)