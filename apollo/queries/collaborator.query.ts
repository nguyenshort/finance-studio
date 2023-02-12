import { gql } from '#imports'

export const GET_COLLABORATORS = gql`
  query GetCollaborators($filter: GetCollaboratorsFilter!) {
    collaborators(filter: $filter) {
      id
      name
      fanpage
      status
      createdAt
      clients {
        id
      }
    }
  }
`
