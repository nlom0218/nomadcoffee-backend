import client from "../../client"

export default {
  Query: {
    seeCoffeeShopPhoto: async (_, { id }) => {
      try {
        const photos = await client.coffeeShopPhoto.findMany({
          where: {
            coffeeShopId: id
          },
          orderBy: {
            createdAt: "desc"
          }
        })
        return photos
      } catch (error) {
        console.log(error);
      }
    }
  }
}