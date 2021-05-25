require("dotenv").config()
import { ApolloServer } from "apollo-server"
import { typeDefs, resolvers } from "./schema"

const PORT = process.env.PORT

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(PORT).then(() => console.log(`🚀  Server ready at http://localhost:${PORT}`))