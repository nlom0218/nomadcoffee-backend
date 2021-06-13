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
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const shopLike = await client.shopLike.findFirst({
        where: {
          AND: [
            { coffeeShopId: id },
            { userId: loggedInUser.id }
          ]
        }
      })
      if (shopLike) {
        return true
      } else {
        return false
      }
    },
    likes: async ({ id }) => client.shopLike.count({
      where: { coffeeShopId: id }
    })
  },
  Category: {
    totalShops: ({ id }) => client.coffeeShop.count({
      where: {
        categories: { some: { id } }
      }
    })
  }
}