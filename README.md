# Fullstack Node.js Exam


## What is this
This project tries to be sort of an online event boards.  
Name: Eventuality


## Features
You can post events on the event board
You can discover events being arranged in your area
You can chat with other event-goers
It's a live chat powered by WebSockets!

## Technical Implementation Notes
It was sort of a goal for the backend to stay "close to the metal", this is why we're writing our own SQL
statements instead of using an ORM. This decision came after a few attempts at creating data models and
trying to use NoSQL databases like MongoDB, but in the end I would always try to use the features of the Mongo
ORMs like Mongoose to create relational constraints, and it all became too much.

The data layer assumes that all the data that comes in and out of the database is good as-is, so we don't
perform any checking manually. The service layer does perform some input-validation, but also assumes output
from the data layer is good. The routing layer tries to stay as minimal as possible. The model layer is purely
JSDoc and plain JS objects.

The backend and frontend are separate packages. They must be accessed through a reverse-proxy to ensure that cookies
and requests are not interfered with by CORS and other CSRF protections since the backend makes no measures to enable
that.


## ER Diagram
```mermaid
  erDiagram
      ACCOUNT 1  -- 1+ AUTHENTICATION : has
      
      ACCOUNT 1  -- 0+ EVENT : arranges
      
      EVENT   1  -- 1  LOCATION : has
      EVENT   1  -- 1+ POSTING : has
      EVENT   1  -- 0+ CHAT : has
      
      CHAT    1  -- 0+ MESSAGE : has
      ACCOUNT 1  -- 0+ MESSAGE : sends
      
      ALL {
          ZonedDateTime created "NOT NULL"
          ZonedDateTime updated
          ZonedDateTime deleted
      }
      
      ACCOUNT {
          String name
          String email
          Blob profile_picture
      }
      
      EVENT {
          String name
          Enum location "{ online, offline }"
          Bool published
          ZonedDateTime start
          ZonedDateTime end
      }
      
      LOCATION {
          String name
          String dawa_key
          Double lat
          Double lon
      }
      
      POSTING {
          Enum type "{ description, update }"
          Json data
      }
      
      CHAT {
          String name
      }
      
      MESSAGE {
          String content
      }
      
      AUTHENTICATION {
          Enum type "{ password, passkey, hardware, totp }"
          String secret
      }
      
      
```