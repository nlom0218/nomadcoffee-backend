import { gql } from "apollo-server-core";

export default gql`
  type SearchCategoryResult {
    coffeeShops: [CoffeeShop]
    totalShops: Int!
  }

  type Query {
    searchCategory(category: String!, page: Int!): SearchCategoryResult
    searchCategoryNative(category: String!): [CoffeeShop]
  }
`