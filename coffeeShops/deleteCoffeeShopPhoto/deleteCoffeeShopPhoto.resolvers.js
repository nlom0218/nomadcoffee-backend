import client from "../../client";
import { uploadPhoto } from "../../shared/shared";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShopPhoto: protectedResolver(
      async (_, { photoId }, { loggedInUser }) => {
        try {
          const delPhoto = await client.coffeeShopPhoto.findUnique({
            where: { id: photoId },
            select: {
              shop: true,
              url: true
            }
          })
          if (!delPhoto) {
            return {
              ok: false,
              error: "해당 커피숍 사진을 찾을 수 없습니다."
            }
          } else if (delPhoto.shop.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: "해당 커피숍 사진 삭제 권한이 없습니다."
            }
          }

          await client.coffeeShopPhoto.delete({
            where: { url: delPhoto.url }
          })

          return {
            ok: true
          }
        } catch (err) { return err }
      }
    )
  }
}