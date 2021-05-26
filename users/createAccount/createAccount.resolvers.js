
import bcrypt from "bcrypt"
import client from "../../client"

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, githubUsername, password }) => {
      const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } })
      if (existingUser) {
        return {
          ok: false,
          error: "The username or email already exists."
        }
      }
      const uglyPassword = await bcrypt.hash(password, 10)
      await client.user.create({
        data: {
          username,
          email,
          name,
          githubUsername,
          password: uglyPassword
        }
      })
      return {
        ok: true
      }
    }
  }
}