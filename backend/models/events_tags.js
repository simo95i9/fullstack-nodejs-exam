import { Logger, undent } from 'shared/utils.js'
import { database } from 'backend/config.js'

const logger = new Logger('models::event_tag')

const table_name = 'junction__events__tags'
const create_table_sql = undent`
    CREATE TABLE junction__events__tags
    (
        event_id VARCHAR(24) NOT NULL,
        tag_id   VARCHAR(24) NOT NULL,

        CONSTRAINT pk__event_id__tag_id PRIMARY KEY (event_id, tag_id),
        CONSTRAINT fk__event_id FOREIGN KEY (event_id) REFERENCES events (id),
        CONSTRAINT fk__tag_id FOREIGN KEY (tag_id) REFERENCES tags (id)
    )
`
const validate_table_sql = undent`
    SELECT sql
    FROM sqlite_master
    WHERE type IS 'table'
      AND name IS $name;
`

export function create_database_table() {
    const create_table_statement = database.prepare(create_table_sql)
    const create_table_result = create_table_statement.run()
    logger.trace(create_table_result)
}

export function database_table_exists() {
    const validate_table_statement = database.prepare(validate_table_sql)
    const result = validate_table_statement.get({ name: table_name })

    if (!result) {
        logger.warn(`Could not find table '${table_name}'`)
        return false
    }

    return true
}

export function database_table_is_valid() {
    const validate_table_statement = database.prepare(validate_table_sql)
    const result = validate_table_statement.get({ name: table_name })

    if (result['sql'] !== create_table_sql) {
        logger.warn(
            `Invalid columns in table '${table_name}'\n` +
                `Expected: ${create_table_sql} \n` +
                `Found: ${result['sql']}`,
        )
        return false
    }

    return true
}
