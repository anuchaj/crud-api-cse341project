const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Product API with OAuth',
    description: 'CRUD API with Google OAuth2 authentication',
  },
  host: 'crud-api-oauthja.onrender.com', // localhost:3000 for local testing
  schemes: ['https'], // http 
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
