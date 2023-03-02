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

export const GET_COLLABORATOR = gql`
    query GetCollaborator($filter: GetCollaboratorFilter!) {
        collaborator(filter: $filter) {
            id
            name
            status
            clients {
                id
                email
                balance
                loan {
                    id
                    signature
                    amount
                    months
                    status
                    createdAt
                }
                info {
                    id
                    name
                    cccd
                }
                createdAt
            }
            fanpage
        }
    }
`
