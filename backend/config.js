// General variables
import { Temporal } from 'temporal-polyfill'
import { Logger } from 'shared/utils.js'

export const port = 6969
export const hostname = 'localhost'

// Configure database
const database_logger = new Logger('backend/database')
import Database from 'better-sqlite3'
export const database = Database('./database/database.sqlite', {
    verbose: (message, ...optionalParams) => {
        database_logger.verbose(message)
    }
})
database.pragma('journal_mode = WAL')
database.pragma('foreign_keys = ON')

// Configure session cookies and storage
import { Store } from 'express-session'
import SqliteStore from 'better-sqlite3-session-store'
const sqlite_store = SqliteStore({ Store })
export const session_options = {
    cookie: {
        maxAge: Temporal.Duration.from({ days: 8 }).total({ unit: 'milliseconds' }),
        httpOnly: true,
        secure: false,
    },
    name: 'session',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    store: new sqlite_store({
        client: database,
    }),
}
