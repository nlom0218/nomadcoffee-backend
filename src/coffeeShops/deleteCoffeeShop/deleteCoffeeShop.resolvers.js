import client from "../../client";

export default {
  Mutation: {
    deleteCoffeeShop: async (_, { shopId }) => {
      try {
        await client.coffeeShopPhoto.deleteMany({
          where: {
            coffeeShopId: shopId
          }
        })
        await client.coffeeShop.delete({
          where: { id: shopId }
        })
        return {
          ok: true
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}