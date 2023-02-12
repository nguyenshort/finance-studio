import { gql } from '#imports'

export const INFO_DOC = gql`
  fragment InfoDoc on Info {
    id
    name
  }
`
