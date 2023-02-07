import { gql } from 'apollo-server';
const typeDefs = gql`
  type VarietyType {
    name: String
  }
  input InputVarietyType {
    name: String
  }
  `;
export default typeDefs;