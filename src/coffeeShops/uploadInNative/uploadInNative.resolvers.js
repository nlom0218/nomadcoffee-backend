import client from "../../client";
import { uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    uploadInNative: protectedResolver(
      async (_, { categories, photo, name }, { loggedInUser }) => {
        const user = await client.user.findUnique({
          where: { id: loggedInUser.id }
        })
        const coffeeShopPhotoURL = await uploadToS3(photo, loggedInUser, "coffeeShop")
        let categoriesObjArr = []
        if (categories) {
          categoriesObjArr = processCategories(categories)
        }
        await client.coffeeShop.create({
          data: {
            photos: {
              create: { url: coffeeShopPhotoURL }
            },
            name,
            user: { connect: { id: loggedInUser.id } },
            ...(categories && {
              categories:
              {
                connectOrCreate: categoriesObjArr
              }
            })
          }
        })

        return {
          ok: true
        }
      }
    )
  }
}