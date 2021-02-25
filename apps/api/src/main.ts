import app from "./app/app";

const PORT = process.env.PORT || 8000

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

app.start(options, ({ port }) =>
  console.log(
    `🚀 Server started, Listening on port ${port}.`,
  ),
)

