import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteCoffeeShop(shopId: Int!): mutationResult
  }
`