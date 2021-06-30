import client from "../../client";

export default {
  Query: {
    seeCategories: (_, { shopId }) => client.category.findMany({
      where: {
        shops: {
          some: {
            id: shopId
          }
        }
      }
    })
  }
}