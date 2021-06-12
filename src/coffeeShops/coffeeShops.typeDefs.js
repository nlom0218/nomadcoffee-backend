import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User
    photos: [CoffeeShopPhoto]
    categories: [Category]
    createdAt: String!
    updatedAt: String!

    # computed fields
    isMine: Boolean!
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop
    rep: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Category {
    id: Int!
    name: String!
    slug: String
    shops: [CoffeeShop]

    # computed fields
    totalShops: Int
  }
`