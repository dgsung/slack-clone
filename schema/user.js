const { gql } = require("apollo-server-express");

export default gql`
  type User {
    id: Int!
    name: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
