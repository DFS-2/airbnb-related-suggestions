
const { Pool, Client } = require('pg');
const Promise = require('bluebird');
const request = require('request');
var convert = require('xml-js');
const fs = require('fs');
const path = require('path');
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

// let progressTables = progress.create().step("seeding tables...")
// progressTables.setTotal(30000);

//create users table data for csv file
let createUsers = function(numEntries, writer, callback) {
    let count = numEntries;
    let data = '';
    
    let write = function() {
        let ok = true;
        while(count > 0 && ok) {
            count -= 1;
            data = `'${faker.lorem.word()}'\n`;
            if(count === 0) {
                writer.write(data, 'utf8', callback);
            } else {
                ok = writer.write(data, 'utf8');
            }
        }
        if(count > 0) {
            // console.log(count)
            writer.once('drain', write);
        }
    }

    write();
}

let createHomes = function(numEntries, writer, callback) {
    let count = numEntries;
    let data = '';
    
    let write = function() {
        let ok = true;
        while(count > 0 && ok) {
            count -= 1;
            data = `'${faker.lorem.word()}', ${faker.random.number()}, ${faker.random.number()} , ${faker.random.number()}, '${faker.lorem.word()}', ${faker.random.number()}, '${faker.lorem.word()}'\n`;
            if(count === 0) {
                writer.write(data, 'utf8', callback);
            } else {
                ok = writer.write(data, 'utf8');
            }
        }
        if(count > 0) {
            // console.log(count)
            writer.once('drain', write);
        }
    }

    write();
}


let createPhotos = function(numEntries, writer, callback) {
    let count = numEntries;
    let data = '';
    
    let write = function() {
        let ok = true;
        while(count > 0 && ok) {
            count -= 1;
            data = `'https://a0.muscache.com/im/pictures/00fcc5e1-78ca-4609-adfc-0b9ae0acb9e7.jpg?aki_policy=large', ${count + 1} \n`;
            data += `'https://a0.muscache.com/im/pictures/00fcc5e1-78ca-4609-adfc-0b9ae0acb9e7.jpg?aki_policy=large', ${count + 1} \n`;
            data += `'https://a0.muscache.com/im/pictures/00fcc5e1-78ca-4609-adfc-0b9ae0acb9e7.jpg?aki_policy=large', ${count + 1} \n`;
            data += `'https://a0.muscache.com/im/pictures/00fcc5e1-78ca-4609-adfc-0b9ae0acb9e7.jpg?aki_policy=large', ${count + 1} \n`;
            data += `'https://a0.muscache.com/im/pictures/00fcc5e1-78ca-4609-adfc-0b9ae0acb9e7.jpg?aki_policy=large', ${count + 1} \n`;
            if(count === 0) {
                writer.write(data, 'utf8', callback);
            } else {
                ok = writer.write(data, 'utf8');
            }
        }
        if(count > 0) {
            // console.log(count)
            writer.once('drain', write);
        }
    }

    write();
}


//create csv file

const writeAndSeedCSV = function() {
    const writeHomes = fs.createWriteStream('homes.csv')
    const writeUsers = fs.createWriteStream('users.csv')
    const writePhotos = fs.createWriteStream('photos.csv')

    createUsers( 1000000, 
        writeUsers, 
        () => { 
            console.log("Completed users file!")
            writeUsers.end();
            pool.query(`COPY users(name) FROM '${path.resolve('users.csv')}' DELIMITER ',';`)
            .then( () => {
                console.log("time to seed database: " + (new Date() - curDate))
            })
        }
    );
    createHomes( 2000000, 
            writeHomes, 
            () => { 
                console.log("Completed homes file!")
                writeHomes.end();
                pool.query(`COPY homeTable(title, price, numReviews, rating, type, numBeds, city) FROM '${path.resolve('homes.csv')}' DELIMITER ',';`)
                .then( () => {
                    console.log("time to seed databases: " + (new Date() - curDate))
                    createPhotos( 2000000, 
                        writePhotos, 
                        () => { 
                            console.log("Completed photos file!")
                            writeUsers.end();
                            pool.query(`COPY photos(photoURL, home_id) FROM '${path.resolve('photos.csv')}' DELIMITER ',';`)
                            .then ( () => {
                                console.log("time to seed databases: " + (new Date() - curDate))
                                return pool.query( `ALTER TABLE photos ADD CONSTRAINT homeid FOREIGN KEY (home_id) REFERENCES homeTable(id)`)
                            })
                            .then ( () => {
                                return pool.query(`CREATE INDEX photoindex ON photos(home_id)`)
                            })
                            .catch( (err) => {
                                console.log("Error with foreign key or indexing...", err)
                            })
                        }
                    );

                })
            }
    );

}

let curDate = new Date()
writeAndSeedCSV()
module.exports = pool





