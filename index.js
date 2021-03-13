const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.connect(
  MONGODB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    try {
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error.message);
    }
  }
);

server.listen({ port: 5000 }, () => {
  try {
    console.log("Server running on port 5000");
  } catch (error) {
    console.error(error.message);
  }
});
