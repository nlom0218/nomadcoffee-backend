import client from "../../client";
import { uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, categories }, { loggedInUser }) => {
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
          // const coffeeShopPhotoURL = await uploadToS3(photo, loggedInUser, "coffeeShop")

          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              user: { connect: { id: loggedInUser.id } },
              // photos: { create: { url: coffeeShopPhotoURL } },
              ...(categories && {
                categories:
                {
                  connectOrCreate: categoriesObjArr
                }
              })
            }
          })
          return {
            ok: true,
            info: coffeeShop.id
          }
        } catch (error) {
          return error
        }
      })
  }
}