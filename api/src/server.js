const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { models, db } = require("./db");

const server = new ApolloServer({
  // this is how you can pass information to your resolvers
  context() {
    const user = models.User.findOne();
    return { models, db, user };
  },
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
