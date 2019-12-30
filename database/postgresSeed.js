const { Pool, Client } = require('pg');
const Promise = require('bluebird');
const request = require('request');
var convert = require('xml-js');
var faker = require('faker');
const progress = require('progressbar');


let pool = new Pool({
    user: 'divyankasalona',
    host: 'localhost',
    database: 'homes',
    password: null,
})
let images = [];
var options = { ignoreComment: true, alwaysChildren: true };

// for(let i = 0; i < 1; i++) {    
//     request("https://airbnbroomimages.s3-us-west-1.amazonaws.com", (error, response, body) => {
//         console.log(convert.xml2js(body, options).elements[0].elements[6].elements[0].elements);
//         // images.push(parser.toJson(body));

//     })
// }

let numUsers = 10000000;

let queries = []
let insertQuery = `INSERT INTO users (name) VALUES`
let progressTables = progress.create().step("seeding tables...")
progressTables.setTotal(30000);
for (var i = 0; i < numUsers+1; i++) {
    if(i%1000 === 0) {
        insertQuery += `('${faker.lorem.word()}');`
        pool.query(insertQuery)
        .then( () => {
            progressTables.addTick()
        })
        insertQuery = `INSERT INTO users (name) VALUES`

    } else {
        insertQuery += `('${faker.lorem.word()}'),`
    }

}
// insertQuery += `('${faker.lorem.word()}');`
pool.query(insertQuery)
    .catch((err) => {
        console.log("Error seeding users...", err)
    })
    .then(() => {
        console.log("Completed users table")
        insertQuery = `INSERT INTO homeTable (title, price, numReviews, rating, type, numBeds, city) VALUES`
        for (var i = 0; i < numUsers * 2 + 1; i++) {
            insertQuery += `('${faker.lorem.word()}',${faker.random.number()}, ${faker.random.number()} , ${faker.random.number()}, ${faker.lorem.word()}, ${faker.random.number()}, ${faker.lorem.word()} ),`
        }
        insertQuery += `('${faker.lorem.word()}',${faker.random.number()}, ${faker.random.number()} , ${faker.random.number()}, ${faker.lorem.word()}, ${faker.random.number()}, ${faker.lorem.word()} );`
    })
    .catch((err) => {
        console.log("Error seeding homeTable...", err)
    })
    .then(() => {
        progressTables.addTick()
        insertQuery = `INSERT INTO homeTable (title, price, numReviews, rating, type, numBeds, city) VALUES`
        for (var i = 0; i < numUsers * 2 + 1; i++) {
            insertQuery += `('${faker.lorem.word()}',${faker.random.number()}, ${faker.random.number()} , ${faker.random.number()}, ${faker.lorem.word()}, ${faker.random.number()}, ${faker.lorem.word()} ),`
        }
        insertQuery += `('${faker.lorem.word()}',${faker.random.number()}, ${faker.random.number()} , ${faker.random.number()}, ${faker.lorem.word()}, ${faker.random.number()}, ${faker.lorem.word()} );`


    })
    .then( () => {
        progressTables.addTick()
        insertQuery = `INSERT INTO homeTable (title, price, numReviews, rating, type, numBeds, city) VALUES`
        progressTables.finish()
    })




