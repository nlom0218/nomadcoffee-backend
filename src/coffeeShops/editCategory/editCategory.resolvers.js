import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, removeCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    removeCategory: protectedResolver(async (_, { categories, shopId }, { loggedInUser }) => {
      const user = await client.user.findFirst({
        where: {
          shop: {
            some: {
              id: shopId
            }
          }
        }
      })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다."
        }
      }

      await client.coffeeShop.update({
        where: { id: shopId },
        data: {
          categories: {
            disconnect: removeCategories(categories)
          }
        }
      })
      return {
        ok: true
      }
    }),
    addCategory: protectedResolver(async (_, { categories, shopId }, { loggedInUser }) => {
      const user = await client.user.findFirst({
        where: { shop: { some: { id: shopId } } }
      })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다."
        }
      }
      await client.coffeeShop.update({
        where: { id: shopId },
        data: {
          categories: {
            connectOrCreate: processCategories(categories)
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}