import { gql } from 'apollo-server';
const typeDefs = gql`
  type Domain {
    name: String
  }

  input InputDomain {
    name: String
  }
  `;
export default typeDefs;