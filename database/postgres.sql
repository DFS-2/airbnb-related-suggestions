 CREATE TABLE homes (
     id integer PRIMARY KEY,
     title text,
     price numeric,
     num_reviews integer,
     rating numeric,
     type text,
     num_beds integer,
     city text,
 );

 CREATE TABLE photos (
     id integer PRIMARY KEY,
     photo_url text,
     home_id integer,
     FOREIGN KEY (home_id) REFERENCES homes(id)
 );

  CREATE TABLE users (
     id integer PRIMARY KEY,
     name text
 );

--  CREATE TABLE userfavoritelists (
--      id integer PRIMARY KEY,
--      name text,
--      user_id integer,
--      FOREIGN KEY (user_id) REFERENCES users(id)
--  );

   CREATE TABLE userfavoritehomes (
     id integer PRIMARY KEY,
     home_id integer,
     user_id integer,
     FOREIGN KEY (home_id) REFERENCES homes(id),
     FOREIGN KEY (userlist_id) REFERENCES userfavoritelists(id)
 );