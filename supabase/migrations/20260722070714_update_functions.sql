do $$
declare
    v_function record;
begin
    for v_function in
        select p.oid::regprocedure as function_signature
        from pg_proc p
        join pg_namespace n on n.oid = p.pronamespace
        where n.nspname = 'public'
          and p.proname in (
              'insert_transaction',
              'delete_transaction',
              'update_transaction_amount'
          )
    loop
        execute format(
            'drop function if exists %s',
            v_function.function_signature
        );
    end loop;
end;
$$;

create function public.insert_transaction (
    p_account_id uuid,
    p_category_id uuid,
    p_amount bigint,
    p_description text,
    p_occurred_on date default current_date
)
returns public.transactions
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_user_id uuid := auth.uid();
    v_transaction public.transactions;
begin
    if v_user_id is null then
        raise exception 'Unauthorized'
            using errcode = '42501';
    end if;

    if not exists (
        select 1
        from public.accounts
        where id = p_account_id
          and user_id = v_user_id
    ) then
        raise exception 'Account not found or not owned by current user'
            using errcode = '42501';
    end if;

    if p_category_id is not null
       and not exists (
            select 1
            from public.categories
            where id = p_category_id
              and user_id = v_user_id
       )
    then
        raise exception 'Category not found or not owned by current user'
            using errcode = '42501';
    end if;

    insert into public.transactions (
        user_id,
        account_id,
        category_id,
        amount,
        occurred_on,
        transaction_description
    )
    values (
        v_user_id,
        p_account_id,
        p_category_id,
        p_amount,
        p_occurred_on,
        p_description
    )
    returning *
    into v_transaction;

    update public.accounts
    set balance = balance + p_amount
    where id = p_account_id
      and user_id = v_user_id;

    return v_transaction;
end;
$$;

create function public.delete_transaction (
    p_transaction_id uuid
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_user_id uuid := auth.uid();
    v_account_id uuid;
    v_amount bigint;
begin
    if v_user_id is null then
        raise exception 'Unauthorized'
            using errcode = '42501';
    end if;

    select account_id, amount
    into v_account_id, v_amount
    from public.transactions
    where id = p_transaction_id
      and user_id = v_user_id
    for update;

    if not found then
        raise exception 'Transaction not found or not owned by current user'
            using errcode = '42501';
    end if;

    delete from public.transactions
    where id = p_transaction_id
      and user_id = v_user_id;

    update public.accounts
    set balance = balance - v_amount
    where id = v_account_id
      and user_id = v_user_id;
end;
$$;

create function public.update_transaction_amount (
    p_transaction_id uuid,
    p_amount bigint
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_user_id uuid := auth.uid();
    v_account_id uuid;
    v_old_amount bigint;
begin
    if v_user_id is null then
        raise exception 'Unauthorized'
            using errcode = '42501';
    end if;

    select account_id, amount
    into v_account_id, v_old_amount
    from public.transactions
    where id = p_transaction_id
      and user_id = v_user_id
    for update;

    if not found then
        raise exception 'Transaction not found or not owned by current user'
            using errcode = '42501';
    end if;

    update public.transactions
    set amount = p_amount
    where id = p_transaction_id
      and user_id = v_user_id;

    update public.accounts
    set balance = balance + (p_amount - v_old_amount)
    where id = v_account_id
      and user_id = v_user_id;
end;
$$;

revoke all
on function public.insert_transaction(uuid, uuid, bigint, text, date)
from public;

revoke all
on function public.delete_transaction(uuid)
from public;

revoke all
on function public.update_transaction_amount(uuid, bigint)
from public;

grant execute
on function public.insert_transaction(uuid, uuid, bigint, text, date)
to authenticated;

grant execute
on function public.delete_transaction(uuid)
to authenticated;

grant execute
on function public.update_transaction_amount(uuid, bigint)
to authenticated;

notify pgrst, 'reload schema';