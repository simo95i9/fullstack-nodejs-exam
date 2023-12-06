// General variables
export const port = 6969
export const hostname = 'localhost'

// Configure database
import { Logger } from 'shared/utils.js'
const database_logger = new Logger('database')
import Database from 'better-sqlite3'
export const database = Database('./database/database.sqlite', {
    verbose: (message) => {
        database_logger.trace(message)
    },
})
database.pragma('journal_mode = WAL')

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
