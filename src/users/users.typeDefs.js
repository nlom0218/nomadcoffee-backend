import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!

    # computed fields
    followers(lastId: Int): [User] 
    following(lastId: Int): [User]
    isMe: Boolean!
    isFollow: Boolean!
    totalCafe: Int!
    totalFollow: Int!
    totalFollowing: Int!
  }
`