import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { coffeeShopId, name, latitude, longitude }, { loggedInUser }) => {
        try {
          const coffeeShop = await client.coffeeShop.findUnique({
            where: { id: coffeeShopId },
            select: { userId: true }
          })
          if (!coffeeShop) {
            return {
              ok: false,
              error: "해당 커피숍을 찾을 수 없습니다."
            }
          } else if (coffeeShop.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "해당 커피숍 수정 권한이 없습니다."
            }
          }

          await client.coffeeShop.update({
            where: { id: coffeeShopId },
            data: {
              name,
              latitude,
              longitude
            }
          })
          return {
            ok: true
          }
        } catch (err) { return err }
      }
    )
  }
}