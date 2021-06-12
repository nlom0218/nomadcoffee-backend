import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    setRepPhoto: protectedResolver(async (_, { shopId, photoId }) => {
      try {
        await client.coffeeShopPhoto.updateMany({
          where: {
            coffeeShopId: shopId
          },
          data: {
            rep: false
          }
        })
        await client.coffeeShopPhoto.update({
          where: { id: photoId },
          data: { rep: true }
        })
        return {
          ok: true
        }
      } catch (error) {
        console.log(error);
      }
    })
  }
}