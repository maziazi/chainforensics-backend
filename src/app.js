require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const neo4j = require('neo4j-driver');

// Import Routes
const blockchainRoutes = require('./routes/blockchain');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// Mount Routes
app.use('/api/v1/blockchain', blockchainRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('ChainForensicsID Backend API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app, neo4jDriver };
