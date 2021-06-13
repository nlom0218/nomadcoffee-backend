import { gql } from "apollo-server-core"

export default gql`
  type Mutation {
    toggleShopLike(shopId: Int!): mutationResult!
  }
`
