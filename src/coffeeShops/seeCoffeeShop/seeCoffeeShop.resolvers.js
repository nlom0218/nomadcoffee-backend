import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { id }) => client.coffeeShop.findUnique({
      where: { id },
      include: { photos: true, user: true, categories: true }
    })
  }
}