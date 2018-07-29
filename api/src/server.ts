import { ApolloServer } from "apollo-server-express";
import express from "express";
import * as fs from "fs";
import * as glob from "glob";
import { makeExecutableSchema } from "graphql-tools";
import * as http from "http";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

(async () => {
  //   TypeDefs
  const typeDefs = glob
    .sync(path.join(__dirname, "./**/*.graphql"))
    .map((f: string) => fs.readFileSync(f, { encoding: "utf8" }));

  // Resolvers
  const resolvers = await Promise.all(
    glob
      .sync(path.join(__dirname, "./**/*.resolvers.ts"))
      .map(async (f: string) => (await import(f)).resolvers)
  );

  //   Mocks
  const mocks = await Promise.all(
    glob
      .sync(path.join(__dirname, "./**/*.mocks.ts"))
      .map(async (f: string) => (await import(f)).mocks)
  );

  const schema = makeExecutableSchema({
    resolvers: mergeResolvers(resolvers),
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    typeDefs: mergeTypes(typeDefs)
  });

  const PORT = 4000;
  const app = express();
  const server = new ApolloServer({
    mocks: Object.assign({}, ...mocks),
    schema
  });
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${
        server.subscriptionsPath
      }`
    );
  });
})();
