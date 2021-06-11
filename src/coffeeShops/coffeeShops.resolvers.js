import client from "../client"

export default {
  CoffeeShop: {
    isMine: async ({ id }, _, { loggedInUser }) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: { id }
      })

      if (!loggedInUser) {
        return false
      }
      return coffeeShop.userId === loggedInUser.id
    },
  },
  Category: {
    totalShops: ({ id }) => client.coffeeShop.count({
      where: {
        categories: { some: { id } }
      }
    })
  }
}