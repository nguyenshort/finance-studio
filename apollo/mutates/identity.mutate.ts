import { gql } from '#imports'

export const UPDATE_IDENTITY = gql`
  ${IDENTITY_DOC}
  mutation UpdateIdentity($input: UpdateIdentityInput!) {
    updateIdentity(input: $input) {
      ...IdentityDoc
    }
  }
`
