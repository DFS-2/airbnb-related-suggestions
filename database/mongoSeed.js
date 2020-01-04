const MongoClient = require('mongodb').MongoClient;
const faker = require('faker');
const url = 'mongodb://127.0.0.1';
const {seedHomes, seedUsers, seedPhotos} = require('./createMongo.js');

console.log(MongoClient)
MongoClient.connect(url, (err, client) => {
    if(err) {
        throw err;
    }
    console.log("Connected to server!");
    let db = client.db('homes');
    let seedDataFunction = (dataFunction, coll) => {
        let collection = db.collection(coll);
        collection.insertMany(dataFunction())
        .then( () => {
            console.log("Success seeding!");
            return;
        })
        .catch( (err) => {
            console.log("Error seeding...", err);
            return;
        })
    }
    
    seedDataFunction(seedUsers, 'users');

})
