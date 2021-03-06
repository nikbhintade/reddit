import express from "express";
import mikroConfig from "./mikro-orm.config";

import { __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { MikroORM } from "@mikro-orm/core";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    
    const orm = await MikroORM.init(mikroConfig);

    await orm.getMigrator().up();
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        }),
    })

    apolloServer.applyMiddleware({ app }); 

    app.listen(4000, () => {
        console.log('listening on port localhost:4000');
    })
};

main().catch((err) => {
    console.error(err);
});