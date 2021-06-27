import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    delUser: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { id }
      })
      if (loggedInUser.id !== user.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다."
        }
      }
      const userShops = await client.coffeeShop.findMany({
        where: {
          userId: id
        }
      })
      console.log(userShops);
      if (userShops.length !== 0) {
        return {
          ok: false,
          error: "생성된 카페를 모두 지우고 다시 시도해주세요."
        }
      }
      await client.shopLike.deleteMany({
        where: {
          userId: id
        }
      })
      await client.user.delete({
        where: { id }
      })
      return {
        ok: true
      }
    })
  }
}