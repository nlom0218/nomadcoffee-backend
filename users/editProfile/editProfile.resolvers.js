import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"
import client from "../../client";
import { createWriteStream, write } from "fs"

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { username, email, name, location, avatarURL, githubUsername, password: newPassword }, { loggedInUser }) => {
        try {
          // change avatarURL
          let newAvatarURL = null
          if (avatarURL) {
            const { filename, createReadStream } = await avatarURL
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
            const readStream = createReadStream()
            const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
            readStream.pipe(writeStream)
            newAvatarURL = `http://localhost:4000/static/${newFilename}`
          }

          // change password
          let uglyPassword = null
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10)
          }

          // update user
          const updatedUser = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              username,
              email,
              name,
              location,
              githubUsername,
              ...(uglyPassword && { password: uglyPassword }),
              ...(newAvatarURL && { avatarURL: newAvatarURL })
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