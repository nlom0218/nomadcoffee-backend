import client from "../client"

export default {
  CoffeeShop: {
    isMine: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    }
  },
  Category: {
    totalShops: ({ id }) => client.coffeeShop.count({
      where: {
        categories: { some: { id } }
      }
    })
  }
}