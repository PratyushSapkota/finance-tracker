# Context
Since fonepay I have been using digital currencies pretty much for everything. I track every single transaction in a google sheet. I treat my bank account as a big bucket which has subaccounts in them. Its pretty hard to a mentally keep track of how much money I have in my checkings subaccount everytime I spend. Thats lame. I needed a proper tracking system.

# Requirements
- Should support desktop and mobile view. The mobile view has two modes: the full dashboard and a minimal balance checker.
For the balance checker it should not use a lot of mobile data.

- Accounts, SubAccounts: inter account transfers
- auto complete descriptions
- Duplicates warning (same desc, same amount, same date)
- whitelisted users
- revert transaction
- (TODO) some sort of auto categorization, but still majority needs user's control

# Entity Relation and Rules

User { user_id, email }

Account { account_id, user_id, account name, balance }

SubAccount { sub_account_id, account_id, name, balance }

Category { category_id, user_id, name}

Transaction { transaction_id, sub_account_id, category_id, description, amount, date }



# Design Choices
- nextjs (shadcn)
- supabase for auth and data

# Tests