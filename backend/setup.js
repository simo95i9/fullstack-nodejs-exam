import * as account_repository from 'backend/models/account.js'
import * as event_repository from 'backend/models/event.js'

const account_exists = account_repository.database_table_exists()
if (!account_exists) {
    account_repository.create_database_table()
}

const account_valid = account_repository.database_table_is_valid()
if (!account_valid) {
    process.exit(-1)
}

const event_exists = event_repository.database_table_exists()
if (!event_exists) {
    event_repository.create_database_table()
}

const event_valid = event_repository.database_table_is_valid()
if (!account_valid) {
    process.exit(-1)
}

process.exit(0)
