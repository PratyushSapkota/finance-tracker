create or replace function public.insert_transaction(
    p_account_id uuid,
    p_category_id uuid,
    p_amount bigint,
    p_occurred_on date default current_date
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_transaction_id uuid;
begin
    if auth.uid() is null then
        raise exception 'Unauthorized';
    end if;

    if p_amount = 0 then
        raise exception 'Transaction amount cannot be zero';
    end if;

    insert into public.transactions (
        user_id,
        account_id,
        category_id,
        amount,
        occurred_on
    )
    values (
        auth.uid(),
        p_account_id,
        p_category_id,
        p_amount,
        p_occurred_on
    )
    returning id into v_transaction_id;

    update public.accounts
    set balance = balance + p_amount
    where id = p_account_id
      and user_id = auth.uid();

    if not found then
        raise exception 'Account not found';
    end if;

    return v_transaction_id;
end;
$$;


create or replace function public.delete_transaction(
    p_transaction_id uuid
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_account_id uuid;
    v_amount bigint;
begin
    if auth.uid() is null then
        raise exception 'Unauthorized';
    end if;

    select
        account_id,
        amount
    into
        v_account_id,
        v_amount
    from public.transactions
    where id = p_transaction_id
      and user_id = auth.uid()
    for update;

    if not found then
        raise exception 'Transaction not found';
    end if;

    delete from public.transactions
    where id = p_transaction_id
      and user_id = auth.uid();

    update public.accounts
    set balance = balance - v_amount
    where id = v_account_id
      and user_id = auth.uid();

    if not found then
        raise exception 'Account not found';
    end if;

    return p_transaction_id;
end;
$$;



create or replace function public.update_transaction_amount(
    p_transaction_id uuid,
    p_new_amount bigint
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
    v_account_id uuid;
    v_old_amount bigint;
begin
    if auth.uid() is null then
        raise exception 'Unauthorized';
    end if;

    if p_new_amount = 0 then
        raise exception 'Transaction amount cannot be zero';
    end if;

    select
        account_id,
        amount
    into
        v_account_id,
        v_old_amount
    from public.transactions
    where id = p_transaction_id
      and user_id = auth.uid()
    for update;

    if not found then
        raise exception 'Transaction not found';
    end if;

    update public.transactions
    set amount = p_new_amount
    where id = p_transaction_id
      and user_id = auth.uid();

    update public.accounts
    set balance = balance + (p_new_amount - v_old_amount)
    where id = v_account_id
      and user_id = auth.uid();

    if not found then
        raise exception 'Account not found';
    end if;
end;
$$;



revoke all on function public.insert_transaction(
    uuid,
    uuid,
    bigint,
    date
) from public;

revoke all on function public.delete_transaction(uuid)
from public;

grant execute on function public.insert_transaction(
    uuid,
    uuid,
    bigint,
    date
) to authenticated;

grant execute on function public.delete_transaction(uuid)
to authenticated;

revoke all on function public.update_transaction_amount(
    uuid,
    bigint
) from public;

grant execute on function public.update_transaction_amount(
    uuid,
    bigint
) to authenticated;