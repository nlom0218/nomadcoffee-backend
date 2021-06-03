import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCategory(name: String!, lastId: Int): [CoffeeShop]
  }
`