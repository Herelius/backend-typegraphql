import "reflect-metadata";
import { DataSource } from "typeorm";
import { ApolloServer } from "apollo-server";

import { buildSchema, Query, Resolver } from "type-graphql";
import { RegisterResolver } from "./resolver/Register";
import { LoginResolver } from "./resolver/Login"
import { customAuthChecker } from "./auth";

require('dotenv').config();

const main = async () => {
  const AppDataSource = new DataSource({
    name: "default",
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.*"]
  });

  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
    authChecker: customAuthChecker,
  });

  const apolloServer = new ApolloServer({ 
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => {
      return {
        token: req.headers.authorization,
        user: null
      }
    }
  });

  apolloServer.listen(4006).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}graphql`)
  })
}

main()
