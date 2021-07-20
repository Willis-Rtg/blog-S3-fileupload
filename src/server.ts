import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { GraphQLUpload, graphqlUploadExpress } from "graphql-upload";
import uploadFile from "./uploadFile";

const typeDefs = gql`
  scalar Upload
  type Mutation {
    createFile(file: Upload!): Boolean
  }
  type Query {
    file: Boolean
  }
`;
let resolvers = {
  Upload: GraphQLUpload,
};

resolvers = { ...resolvers, ...uploadFile };

async function startServer() {
  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();

  const app = express();
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });

  await new Promise((r: any) => app.listen({ port: 5000 }, r));
  console.log(`🚀 Server ready at http://localhost:5000${apollo.graphqlPath}`);
}

startServer();
