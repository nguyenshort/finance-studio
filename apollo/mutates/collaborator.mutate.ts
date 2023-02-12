import { gql } from '#imports'

export const CREATE_COLLABORATOR = gql`
  mutation CreateCollaborator($input: CreateCollaboratorInput!) {
    createCollaborator(input: $input) {
      id
      name
      status
      fanpage
      createdAt
      updatedAt
    }
  }
`

export const TOGGLE_COLLABORATOR = gql`
  mutation ToggleCollaborator($input: UpdateCollaboratorInput!) {
    updateCollaborator(input: $input) {
      id
      status
    }
  }
`

export const UPDATE_COLLABORATOR = gql`
  mutation UpdateCollaborator($input: UpdateCollaboratorInput!) {
    updateCollaborator(input: $input) {
      id
      name
      fanpage
      status
    }
  }
`
