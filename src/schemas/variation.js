import { gql } from 'apollo-server';
const typeDefs = gql`
  type Variation {
    name: String
    variables: [VariationVariable]
  }

  input InputVariation {
    name: String
    variables: [InputVariationVariable]
  }

  type VariationVariable {
    var: String
    value: String
    valueArray: [VariationVariable]
  }

  input InputVariationVariable {
    var: String
    value: String
    valueArray: [InputVariationVariable]
  }
  `;
export default typeDefs;