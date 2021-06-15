import client from "../../client";

export default {
  Query: {
    searchCategory: async (_, { category, page }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        take: 6,
        skip: page === 1 ? 0 : 6,
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
      const totalShops = await client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name: category
            }
          }
        }
      })
      return {
        coffeeShops,
        totalShops
      }
    }
  }
}