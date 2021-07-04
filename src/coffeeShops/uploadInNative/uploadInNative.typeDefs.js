import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadInNative(
      categories: String
      photo: Upload!
      name: String!
    ): mutationResult
  }
`