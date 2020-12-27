import app from "../app";


const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

app.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)

// app.start({ port: process.env.PORT | 4000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 4000}!`);
// });
