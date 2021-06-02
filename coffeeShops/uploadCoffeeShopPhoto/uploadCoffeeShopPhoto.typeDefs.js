import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadCoffeeShopPhoto(
      coffeeShopId: Int!
      photo: Upload!
    ): mutationResult
  }
`