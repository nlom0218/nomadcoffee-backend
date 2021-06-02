import client from "../../client";
import { uploadPhoto } from "../../shared/shared";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadCoffeeShopPhoto: protectedResolver(
      async (_, { coffeeShopId, photo }, { loggedInUser }) => {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id: coffeeShopId },
          select: { userId: true }
        })
        if (!coffeeShop) {
          return {
            ok: false,
            error: "해당 커피숍 사진을 찾을 수 없습니다."
          }
        } else if (coffeeShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "해당 커피숍 사진 업로드 권한이 없습니다."
          }
        }
        const coffeeShopPhotoURL = await uploadPhoto(photo, loggedInUser)

        await client.coffeeShop.update({
          where: { id: coffeeShopId },
          data: {
            photos: {
              create: { url: coffeeShopPhotoURL }
            }
          }
        })

        return {
          ok: true
        }
      }
    )
  }
}