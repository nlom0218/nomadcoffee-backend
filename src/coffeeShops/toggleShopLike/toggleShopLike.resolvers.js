import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleShopLike: protectedResolver(
      async (_, { shopId }, { loggedInUser }) => {
        try {
          const ok = await client.coffeeShop.findUnique({ where: { id: shopId } })
          if (!ok) {
            return {
              ok: false,
              error: "해당 카페를 찾을 수 없습니다."
            }
          }
          const shopLike = await client.shopLike.findUnique({
            where: {
              coffeeShopId_userId: {
                coffeeShopId: shopId,
                userId: loggedInUser.id
              }
            }
          })
          if (shopLike) {
            await client.shopLike.delete({
              where: { id: shopLike.id }
            })
          } else {
            await client.shopLike.create({
              data: {
                user: { connect: { id: loggedInUser.id } },
                shop: { connect: { id: shopId } }
              }
            })
          }
          return {
            ok: true
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  }
}