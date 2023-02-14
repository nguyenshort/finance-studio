import { gql } from '#imports'

export const CHANGE_COLLABORATOR = gql`
  mutation AdminUpdateUserCollaborator($input: AdminUpdateUserInput!) {
    adminUpdateUser(input: $input) {
      id
      collaborator {
        id
        name
        status
      }
    }
  }
`
