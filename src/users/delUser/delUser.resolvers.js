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
      await client.user.delete({
        where: { id }
      })
      return {
        ok: true
      }
    })
  }
}