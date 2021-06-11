import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(name: String!, categories: String): mutationResult!
  }
`