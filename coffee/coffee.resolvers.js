import client from "../client";

export default {
  Query: {
    seeCoffee: (_, { id }) => client.coffee.findUnique({ where: { id } })
  },
  Mutation: {
    createCoffee: (_, { name }) => client.coffee.create({ data: { name } })
  }
}