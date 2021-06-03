import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editCoffeeShop(
      coffeeShopId: Int!
      name: String
      latitude: String
      longitude: String
    ): mutationResult
  }
`