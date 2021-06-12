import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    setRepPhoto(shopId: Int!, photoId: Int!): mutationResult
  }
`