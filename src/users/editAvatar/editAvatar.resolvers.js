import { protectedResolver } from "../users.utils";
import client from "../../client";
import { uploadToS3 } from "../../shared/shared";

export default {
  Mutation: {
    editAvatar: protectedResolver(
      async (_, { avatarURL }, { loggedInUser }) => {
        try {

          const newAvatarURL = await uploadToS3(avatarURL, loggedInUser, "user")


          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              avatarURL: newAvatarURL
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