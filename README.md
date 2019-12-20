# airbnb-related-suggestions
Carousel of related homes. A component situated at the bottom of the page. 

# Client-side
This project was created using Javascript with React. It utilizes babel and webpack to transpile and bundle the code, respectively. Scripts are run with npm. Run build to start webpack with watch mode. 

# Creating the Database
The database can be created by running db:pg-create. The database utilizes PostgreSQL. 

# Seeding the Database
The database can be seeded with mock data with the files located in /database/seed. Run db:seed to seed the database with randomly generated suggested homes and photos for each home listing.

# Running the server
The server is routed using express. Nodemon is used to run the server in developer versions. Run start to start server with nodemon.

# Testing
Testing is performed using the Jest testing framework with Enzyme to test React components. Run test to start Jest testing.

# CRUD API
Create/POST: '/api/listings/:homeId'
Read/GET: '/api/listings/:homeId'
Update/PUT: '/api/listings/:homeId'
Delete/DELETE: '/api/listings/:homeId'
