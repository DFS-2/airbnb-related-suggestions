require('newrelic');

const express = require('express');
const router = require('./router.js');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

// app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/', router);
// app.use('/', express.static(path.resolve(__dirname, '../public')));
// app.use('/:id/', express.static(path.resolve(__dirname, '../public')));


app.listen(port, () => {
  console.log(`listenin to port ${port}`);
});