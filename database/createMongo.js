const faker = require('faker');
let numUsers = 1000000

const seedHomes = () => {
    let homes = [];
}

const seedUsers = () => {
    let users = [];
    for(let i = 0; i < numUsers + 1; i++) {
        users.push( {
            name: faker.name.firstName()
        })
    }
    return users;

}

const seedPhotos = () => {
    let photos = [];
}

module.exports = {
    seedHomes,
    seedUsers,
    seedPhotos
};