import { GraphQLServer, PubSub } from "graphql-yoga";
import path from 'path';
import serveStatic from 'serve-static';


import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const pubsub = new PubSub();



const app = new GraphQLServer({
  endpoint: '/graphqli',
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});


// app.express.get('/', (req, res, next) => {
//   // here you can use your way to get the path dir ..  
//   const pathDir = path.join(__dirname, `../client/build/`);

//   res.sendFile(pathDir);
// }); // ✔️🚀

// app.express.use('/', app.express.static(path.resolve('./client/build/')))

// app.express.use('/',serveStatic(path.resolve('./client/build/'), { 'index': ['default.html'] }))
// app.express.get("/", (req, res) => {
//   return res.sendFile(path.resolve('./client/build/index.html'));
// });

export default app;
