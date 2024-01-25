const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const customerRoutes = require('./routes/customer.routes'); // Adjust the path as necessary

const app = express();

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PCS API',
      version: '1.0.0',
      description: 'A simple Express pcs API'
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
        description: 'Development server'
      }
    ],
  },
  apis: ['./routes/customer.routes.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Morgan for logging HTTP requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Customer routes
app.use('/api/v1', customerRoutes);

// Live test route
app.get("/api/v1/ping", (req, res) => {
  res.status(200).send("Server is live");
});

module.exports = app;
