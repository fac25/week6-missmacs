BEGIN;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  src TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  allergens TEXT NOT NULL DEFAULT none
);

COMMIT;