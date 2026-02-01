\c postgres

CREATE TYPE public.task_status AS ENUM('completed', 'uncompleted');

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table public.projects (
  project_id uuid not null default gen_random_uuid (),
  project_name text not null,
  created_at timestamp with time zone not null default now(),
  project_due_date date not null,
  project_description text null,
  user_id uuid not null default gen_random_uuid (),
  constraint projects_pkey primary key (project_id)
) TABLESPACE pg_default;

create table public.tasks (
  task_id uuid not null default gen_random_uuid (),
  task_name text not null,
  created_at timestamp with time zone null default now(),
  project_id uuid not null default gen_random_uuid (),
  user_id uuid not null default gen_random_uuid (),
  task_status public.task_status not null default 'uncompleted'::task_status,
  updated_at timestamp with time zone null,
  constraint tasks_pkey primary key (task_id),
  constraint tasks_project_id_fkey foreign KEY (project_id) references projects (project_id)
) TABLESPACE pg_default;

create trigger update_tasks_updated_at BEFORE
update on tasks for EACH row
execute FUNCTION update_updated_at_column ();

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

create policy "Enable users to view their own data only"
on "public"."projects"
as PERMISSIVE
for SELECT
to authenticated
using (
 (select auth.uid()) = user_id
);

create policy "Enable insert for users based on user_id"
on "public"."projects"
as PERMISSIVE
for INSERT
to public
with check (
 (select auth.uid()) = user_id
);

create policy "Enable delete for users based on user_id"
on "public"."projects"
as PERMISSIVE
for DELETE
to public
using (
  (select auth.uid()) = user_id
);

create policy "Enable update for users based on user_id"
on "public"."projects"
as PERMISSIVE
for UPDATE
to public
using (
  (select auth.uid()) = user_id
);

create policy "Enable users to view their own data only"
on "public"."tasks"
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Enable insert for users based on user_id"
on "public"."tasks"
as PERMISSIVE
for INSERT
to public
with check (
  (select auth.uid()) = user_id
);

create policy "Enable delete for users based on user_id"
on "public"."tasks"
as PERMISSIVE
for DELETE
to public
using (
  (select auth.uid()) = user_id
);

create policy "Enable update for users based on user_id"
on "public"."tasks"
as PERMISSIVE
for UPDATE
to public
using (
  (select auth.uid()) = user_id
);