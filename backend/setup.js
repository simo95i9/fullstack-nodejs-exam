import * as account_repository from 'backend/models/accounts.js'
import * as event_repository from 'backend/models/events.js'
import * as post_repository from 'backend/models/posts.js'
import * as tag_repository from 'backend/models/tags.js'
import * as event_tag_repository from 'backend/models/events_tags.js'

const repositories = [
    account_repository,
    event_repository,
    post_repository,
    tag_repository,
    event_tag_repository,
]

for (const repository of repositories) {
    if (!repository.database_table_exists()) repository.create_database_table()
    if (!repository.database_table_is_valid()) process.exit(-1)
}

process.exit(0)
