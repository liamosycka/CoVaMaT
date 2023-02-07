import { gql } from 'apollo-server';
const typeDefs = gql`
  type VariationPoint {
    name: String
  }

  input InputVariationPoint {
    name: String
  }
  `;
export default typeDefs;