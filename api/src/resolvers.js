/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  //  Query should match the Query field in the typeDefs object
  Query: {
    // first and second arguments can be named anything
    // named below  for later reference
    pets(_initialValue, __argumentsFromClient, context) {
      return context.models.Pet.findMany(__argumentsFromClient.input);
    },
    pet(_initialValue, __argumentsFromClient, context) {
      return context.models.Pet.findOne(__argumentsFromClient.input);
    },
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      return ctx.models.Pet.create(input);
    },
  },
  // Pet: {
  //   img(pet) {
  //     return pet.type === "DOG"
  //       ? "https://placedog.net/300/300"
  //       : "http://placekitten.com/300/300";
  //   },
  // },
  // User: {

  // }
};
