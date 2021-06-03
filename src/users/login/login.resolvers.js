import client from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        // check username
        const user = await client.user.findUnique({ where: { username } })
        if (!user) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다."
          }
        }

        // check password
        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) {
          return {
            ok: false,
            error: "비밀번호가 틀립니다."
          }
        }

        // sign token
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY)
        return {
          ok: true,
          token
        }
      } catch (err) {
        return err
      }
    }
  }
}