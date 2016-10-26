`CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" varchar(40) DEFAULT NULL,
    "city" varchar(50) DEFAULT NULL
)`

`CREATE TABLE IF NOT EXISTS "interests" (
    "id" SERIAL PRIMARY KEY,
    "interest" varchar(40) DEFAULT NULL,
    "userId" integer REFERENCES users
);`
