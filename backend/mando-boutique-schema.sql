CREATE TABLE items (
  sku VARCHAR(25) PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  brand TEXT NOT NULL,
  description TEXT,
  video TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  images TEXT[],
  tags TEXT[],
  features TEXT[]
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER 
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE cart_items (
    cart_id INTEGER NOT NULL
    REFERENCES carts ON DELETE CASCADE,
   item_sku VARCHAR(25) NOT NULL
    REFERENCES items ON DELETE CASCADE,
  PRIMARY KEY (cart_id, item_sku)
);