import { gql } from "apollo-server-core";

export default gql`
  type Coffee {
    id: Int!
    name: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    seeCoffee(id: Int!): Coffee
  }
  type Mutation {
    createCoffee(name: String!): Coffee
  }
`