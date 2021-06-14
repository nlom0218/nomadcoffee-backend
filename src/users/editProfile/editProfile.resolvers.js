import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"
import client from "../../client";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { username, email, name, githubUsername, password: newPassword }, { loggedInUser }) => {
        try {
          // change password
          let uglyPassword = null
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10)
          }

          // update user
          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              ...(username !== "" && { username }),
              ...(email !== "" && { email }),
              ...(name !== "" && { name }),
              ...(githubUsername !== "" && { githubUsername }),
              ...(uglyPassword && { password: uglyPassword })
            }
          })

          if (updatedUser.id) {
            return {
              ok: true
            }
          } else {
            return {
              ok: false,
              error: "사용자 정보 수정에 실패하였습니다."
            }
          }
        } catch (err) {
          return err
        }
      }
    )
  }
}