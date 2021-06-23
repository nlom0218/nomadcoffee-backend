import client from "../../client"

export default {
  Query: {
    seeCoffeeSHopsNative: async (_, { offset }) => {
      return await client.coffeeShop.findMany({
        take: 6,
        skip: offset,
        include: {
          photos: true,
          user: true,
          categories: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    }
  }
}