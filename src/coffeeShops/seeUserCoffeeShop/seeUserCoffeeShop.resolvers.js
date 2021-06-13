import client from "../../client";

export default {
  Query: {
    seeUserCoffeeShop: (_, { username }) => client.coffeeShop.findMany({
      where: {
        user: {
          username
        }
      },
      include: { photos: true },
      orderBy: { createdAt: "desc" }
    })
  }
}