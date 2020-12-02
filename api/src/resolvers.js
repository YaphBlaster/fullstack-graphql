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
      console.log("Query => pet");
      return context.models.Pet.findOne(__argumentsFromClient.input);
    },
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      return ctx.models.Pet.create(input);
    },
  },
  Pet: {
    // Field level resolver
    // First argument is always what the type is IE: Pet
    owner(pet, __, context) {
      console.log("PET => owner");
      return context.models.User.findOne();
    },

    // img(pet) {
    //   return pet.type === "DOG"
    //     ? "https://placedog.net/300/300"
    //     : "http://placekitten.com/300/300";
    // },
  },
  User: {
    pets(user, __, ctx) {
      console.log("User => pets");
      // return ctx.models.Pet.findMany({user: user.id})
      return ctx.models.Pet.findMany({});
      // return this.pets;
    },
  },
};
