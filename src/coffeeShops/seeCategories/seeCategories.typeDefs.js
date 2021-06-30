import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCategories(shopId: Int!): [Category]
  }
`