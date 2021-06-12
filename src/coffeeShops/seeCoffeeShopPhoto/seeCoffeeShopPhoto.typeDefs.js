import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCoffeeShopPhoto(id: Int!): [CoffeeShopPhoto]
  }
`