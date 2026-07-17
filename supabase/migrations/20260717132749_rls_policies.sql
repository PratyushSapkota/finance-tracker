create policy "Users can view their own buckets" on public.buckets for
select
    to authenticated using (auth.uid () = user_id);

create policy "Users can create their own buckets" on public.buckets for insert to authenticated
with
    check (auth.uid () = user_id);

create policy "Users can update their own buckets" on public.buckets for
update to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Users can view their own categories" on public.categories for
select
    to authenticated using (auth.uid () = user_id);

create policy "Users can create their own categories" on public.categories for insert to authenticated
with
    check (auth.uid () = user_id);

create policy "Users can update their own categories" on public.categories for
update to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Users can view their own accounts" on public.accounts for
select
    to authenticated using (auth.uid () = user_id);

create policy "Users can create their own accounts" on public.accounts for insert to authenticated
with
    check (auth.uid () = user_id);

create policy "Users can update their own accounts" on public.accounts for
update to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Users can view their own transactions" on public.transactions for
select
    to authenticated using (auth.uid () = user_id);

create policy "Users can create their own transactions" on public.transactions for insert to authenticated
with
    check (auth.uid () = user_id);

create policy "Users can update their own transactions" on public.transactions for
update to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

create policy "Users can delete their own transactions" on public.transactions for delete to authenticated using (auth.uid () = user_id);