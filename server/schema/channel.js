const { gql } = require("apollo-server-express");

export default gql`
  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
  }
  type Mutation {
    createChannel(
      name: String!
      public: Boolean = false
      teamId: Int!
    ): Boolean!
  }
`;
