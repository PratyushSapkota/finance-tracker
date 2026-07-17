create extension if not exists pgcrypto;

create table
    public.buckets (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references auth.users (id) on delete cascade,
        name text not null,
        color text not null default '#ffffff',
        unique (user_id, name),
        unique (id, user_id)
    );

create table
    public.categories (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references auth.users (id) on delete cascade,
        name text not null,
        color text not null default '#ffffff',
        unique (user_id, name),
        unique (id, user_id)
    );

create table
    public.accounts (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references auth.users (id) on delete cascade,
        bucket_id uuid not null,
        name text not null,
        balance bigint not null default 0,
        closed boolean not null default false,
        unique (user_id, name),
        foreign key (bucket_id, user_id) references public.buckets (id, user_id) on delete restrict,
        unique (id, user_id)
    );

create table
    public.transactions (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references auth.users (id) on delete cascade,
        account_id uuid not null,
        category_id uuid not null,
        amount bigint not null check (amount <> 0),
        occurred_on date not null default current_date,
        foreign key (account_id, user_id) references public.accounts (id, user_id) on delete restrict,
        foreign key (category_id, user_id) references public.categories (id, user_id) on delete restrict
    );

create index buckets_user_id_idx on public.buckets (user_id);

create index categories_user_id_idx on public.categories (user_id);

create index accounts_user_id_idx on public.accounts (user_id);

create index accounts_bucket_id_idx on public.accounts (bucket_id);

create index accounts_user_closed_idx on public.accounts (user_id, closed);

create index transactions_user_id_idx on public.transactions (user_id);

create index transactions_account_id_idx on public.transactions (account_id);

create index transactions_category_id_idx on public.transactions (category_id);

create index transactions_user_date_idx on public.transactions (user_id, occurred_on desc);

create index transactions_account_date_idx on public.transactions (account_id, occurred_on desc);

alter table public.buckets enable row level security;

alter table public.categories enable row level security;

alter table public.accounts enable row level security;

alter table public.transactions enable row level security;