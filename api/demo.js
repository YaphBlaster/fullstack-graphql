const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

const typeDefs = gql`
  union Footwear = Sneaker | Boot

  """
  This is how you get things to show up in the DOCS area when the server starts
  """
  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    #   ! denotes a required field
    email: String!
    avatar: String
    # Array of shoes
    shoes: [Shoe]!
  }

  # Interface describes common fields
  # Note: These still must be explicitly set in any type that implements Shoe
  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    hasGrip: Boolean!
  }

  # Input types are used to filter queries
  input ShoesInput {
    brand: ShoeType!
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  #   at minimum a schema needs a Query type
  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "ditto@pokemon.com",
  avatar: "http://ditto.png",
  shoes: [],
};

const shoes = [
  { brand: "NIKE", size: 12, sport: "basketball", user: 1 },
  { brand: "TIMBERLAND", size: 14, hasGrip: true, user: 1 },
];

const resolvers = {
  Query: {
    me() {
      return {
        ...user,
      };
    },

    // the order for the arguments are
    // initialValue
    // argumentsFromClient
    // context
    // info
    shoes(_, { input }) {
      return shoes;
    },
  },

  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  // custom resolvers for specific types
  User: {
    shoes() {
      return shoes;
    },
  },

  // For interface resolving (Sneaker vs Boot)
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
  Sneaker: {
    // handling resolving the user field
    user(shoe) {
      return user;
    },
  },
  Boot: {
    // handling resolving the user field
    user(shoe) {
      return user;
    },
  },

  Footwear: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// run in terminal with node .\api\demo.js
server.listen(4000).then(() => console.log("on port 4000"));
