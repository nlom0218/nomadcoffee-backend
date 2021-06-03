import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      avatarURL: Upload
      githubUsername: String
      password: String
    ): mutationResult!
  }
`