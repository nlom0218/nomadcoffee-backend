import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    addCategory(categories: String!, shopId: Int!): mutationResult!
    removeCategory(categories: String!): mutationResult!
  }
`