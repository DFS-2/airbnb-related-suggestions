 CREATE TABLE homes (
     id integer PRIMARY KEY,
     title text,
     price numeric,
     numReviews integer,
     rating numeric,
     type text,
     numBeds integer,
     city text,
 );

 CREATE TABLE photos (
     id integer PRIMARY KEY,
     photoURL text,
     home_id integer,
     FOREIGN KEY (home_id) REFERENCES homes(home_id)
 );