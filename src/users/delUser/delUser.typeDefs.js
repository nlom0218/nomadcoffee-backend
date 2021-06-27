import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    delUser(id: Int!): mutationResult
  }
`