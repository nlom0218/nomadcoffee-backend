import client from "../../client";
import { uploadPhoto } from "../../shared/shared";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, categories, photo }, { loggedInUser }) => {
        try {
          // check coffeeShop name(unique)
          const ok = await client.coffeeShop.findUnique({ where: { name } })
          if (ok) {
            return {
              ok: false,
              error: "이름이 이미 존재합니다."
            }
          }

          // create categories Obj Arr for connectOrCreate
          let categoriesObjArr = []
          if (categories) {
            categoriesObjArr = processCategories(categories)
          }

          // uploads main photo
          const coffeeShopPhotoURL = await uploadPhoto(photo, loggedInUser)

          await client.coffeeShop.create({
            data: {
              name,
              user: { connect: { id: loggedInUser.id } },
              photos: { create: { url: coffeeShopPhotoURL } },
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
        } catch (error) {
          return error
        }
      })
  }
}