import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCategories(lastId: Int): [Category]
  }
`