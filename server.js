require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const stripeRoutes = require('./app/routers/stripe');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Check Status routes
app.get('/', function (req, res) {
  return res.status(200).send('OK')
})
app.get('/v1/status', (req, res) => {
  return res.status(200).send('OK')
})

// App routes
app.use('/v1', stripeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});