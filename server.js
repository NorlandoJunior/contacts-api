require('dotenv').config(); 

const express = require('express');
const app = express();
const contactsRoute = require('./routes/contacts');

const port = process.env.PORT || 3000;


app.use(express.json());


app.use('/contacts', contactsRoute);


app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
