const express = require('express');
const app = express();
const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

