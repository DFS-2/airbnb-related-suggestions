const { Pool, Client } = require('pg');

let pool = new Pool({
    user: 'divyankasalona',
    host: 'localhost',
    database: 'mydb',
    password: null,
})

pool.query(`CREATE DATABASE homes;`)
    .catch((err) => {
        console.log("Error creating database...", err)
    })

    .then(() => {
        pool.end()
        pool = new Pool({
            user: 'divyankasalona',
            host: 'localhost',
            database: 'homes',
            password: null
        })
        console.log("Connection established!")
    })
    .then(() => {
        return pool.query(`DROP TABLE IF EXISTS userfavoritehomes;`)
    })
    .then(() => {
        return pool.query(`DROP TABLE IF EXISTS photos;`)
    })
    .then(() => {
        return pool.query(`DROP TABLE IF EXISTS homeTable;`)
    })
    .then(() => {
        return pool.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
        return pool.query(`CREATE TABLE homeTable (
        id SERIAL PRIMARY KEY,
        title text,
        price numeric,
        numReviews integer,
        rating numeric,
        type text,
        numBeds integer,
        city text
    );`)
    })
    .then(() => {
        console.log("Homes table was successfully created!")
        return pool.query(`CREATE TABLE photos (
        id SERIAL PRIMARY KEY,
        photoURL text,
        home_id integer,
        FOREIGN KEY (home_id) REFERENCES homeTable(id)
    );`)
    })
    .then(() => {
        console.log("Photos was successfully created!")
        return pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name text
    );`)
    })
    .catch((err) => {
        console.log("Error creating initial tables...", err)
    })
    .then(() => {
        console.log("Users was successfully created!")
        return pool.query(`CREATE TABLE userfavoritehomes (
        id SERIAL PRIMARY KEY,
        home_id integer,
        user_id integer,
        FOREIGN KEY (home_id) REFERENCES homeTable(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );`)
    })
    .catch((err) => {
        console.log("Error creating join table...", err)
    })


// const client = new Client({
//     user: 'divy',
//     host: 'localhost',
//     database: 'mydb',
//     password: 'password',
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })


// pool.connect((err, client, release) => {
//     if (err) {
//       return console.error('Error acquiring client', err.stack)
//     }
//     client.query('SELECT NOW()', (err, result) => {
//       release()
//       if (err) {
//         return console.error('Error executing query', err.stack)
//       }
//       console.log(result.rows)
//     })
//   })

// CREATE TABLE homes (
//     id integer PRIMARY KEY,
//     title text,
//     price numeric,
//     numReviews integer,
//     rating numeric,
//     type text,
//     numBeds integer,
//     city text,
// );

// CREATE TABLE photos (
//     id integer PRIMARY KEY,
//     photoURL text,
//     home_id integer FOREIGN_KEY,
// );