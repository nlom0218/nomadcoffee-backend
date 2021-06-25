import client from "../../client";

export default {
  Query: {
    searchCategoryNative: async (_, { category }) => {
      return await client.coffeeShop.findMany({
        // take: 6,
        // skip: offset,
        where: {
          categories: {
            some: {
              name: category
            }
          }
        },
        include: { photos: true },
        orderBy: { createdAt: "desc" }
      })
    }
  }
}