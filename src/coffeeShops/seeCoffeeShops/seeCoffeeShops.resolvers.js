import client from "../../client"

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const shops = await client.coffeeShop.findMany({
        take: 6,
        skip: page * 6 - 6,
        include: {
          photos: true,
          user: true
        },
        orderBy: {
          createdAt: "desc"
        }
      })
      const totalShops = await client.coffeeShop.count()
      return {
        shops,
        totalShops
      }
    }
  }
}