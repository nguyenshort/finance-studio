import { gql } from '#imports'

export const IDENTITY_DOC = gql`
  fragment IdentityDoc on Identity {
    id
    front
    back
    avatar
  }
`
