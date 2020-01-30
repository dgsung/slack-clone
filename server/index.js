import express from "express";
import { ApolloServer, graphqlExpress } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";
import cors from "cors";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, user: { id: 10 } }
});

const app = express();
app.use(cors("*"));
server.applyMiddleware({ app });

models.sequelize.sync().then(x => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
