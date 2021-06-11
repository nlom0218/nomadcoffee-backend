import { gql } from "apollo-server-core";

export default gql`
  type seeCoffeeShopsResult {
    shops: [CoffeeShop]
    totalShops: Int!
  }

  type Query {
    seeCoffeeShops(page: Int!): seeCoffeeShopsResult!
  }
`