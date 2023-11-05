CREATE TABLE IF NOT EXISTS public.ticket (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    price numeric(10, 2),
    user_id uuid REFERENCES public.user(id),
    show_id uuid REFERENCES public.show(id)
)