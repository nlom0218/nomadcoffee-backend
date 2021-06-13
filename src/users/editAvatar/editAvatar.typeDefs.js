import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editAvatar(
      avatarURL: Upload!
    ): mutationResult!
  }
`