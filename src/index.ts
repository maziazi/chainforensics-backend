import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { Express } from 'express';

// Load environment variables
dotenv.config();

async function startServer() {
  // Create Express application
  const app = express();
  
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });

  // Start Apollo Server
  await server.start();
  
  // Apply middleware
  server.applyMiddleware({ app: app as any });
  
  // Define port
  const PORT = process.env.PORT || 4000;
  
  // Start server
  const httpServer = (app as any).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
  
  // Try to connect to database
  try {
    await createConnection();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

// Start the server
startServer().catch(error => {
  console.error('Server startup error:', error);
});
