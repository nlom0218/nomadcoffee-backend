import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username, lastId }) => client.user.findUnique({ where: { username } })
  },
  User: {
    followers: async ({ id }, { lastId }) =>
      client.user.findMany({
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        where: {
          following: { some: { id } }
        }
      }),
    following: async ({ id }, { lastId }) =>
      client.user.findMany({
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        where: {
          followers: { some: { id } }
        }
      })
  }
}