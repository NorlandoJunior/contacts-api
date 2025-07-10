require('dotenv').config(); 

const express = require('express');
const app = express();
const contactsRoute = require('./routes/contacts');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 3000;

// Swagger serttings 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API to manage contacts'
    },
  },
  apis: ['./routes/*.js'], // Show where comments go Swagger comments
};

const specs = swaggerJsdoc(options);

// Middlewares
app.use(express.json());

//My Routes
app.use('/contacts', contactsRoute);

// Route  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
