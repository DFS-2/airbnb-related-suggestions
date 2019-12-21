const { Pool, Client } = require('pg');
const Promise = require('bluebird');
const request = require('request');
var convert = require('xml-js');
var faker = require('faker');


let pool = new Pool({
    user: 'divyankasalona',
    host: 'localhost',
    database: 'homes',
    password: null,
})
let images = [];
var options = {ignoreComment: true, alwaysChildren: true};

// for(let i = 0; i < 1; i++) {    
//     request("https://airbnbroomimages.s3-us-west-1.amazonaws.com", (error, response, body) => {
//         console.log(convert.xml2js(body, options).elements[0].elements[6].elements[0].elements);
//         // images.push(parser.toJson(body));

//     })
// }

let numUsers = 1000000;

let userQueries = [];
let insertQuery = `INSERT INTO users (name) VALUES`
for(var i = 0; i < numUsers; i++) {
    insertQuery += `('${faker.name.findName().replace("'", "")}'),`
    // console.log(insertQuery)
}
insertQuery += `('${faker.name.findName().replace("'", "")}');`
// console.log(insertQuery)
pool.query( insertQuery )




