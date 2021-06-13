import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeUserCoffeeShop(username: String!, lastId: Int): [CoffeeShop]
  }
`