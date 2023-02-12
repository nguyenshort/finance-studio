import { gql } from '#imports'

export const UPDATE_INFO = gql`
  ${INFO_DOC}
  mutation UpdateInfo($input: UpdateInfoInput!) {
    updateInfo(input: $input) {
      ...InfoDoc
    }
  }
`
