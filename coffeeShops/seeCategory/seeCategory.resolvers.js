import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { name, lastId }) => client.coffeeShop.findMany({
      take: 3,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      where: { categories: { some: { name } } }
    })
  }
}