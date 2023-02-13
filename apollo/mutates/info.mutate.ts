import { gql } from '#imports'

export const UPDATE_INFO = gql`
  mutation AdminUpdateInfo($input: UpdateInfoInput!) {
    adminUpdateInfo(input: $input) {
      id
      name
      born
      cccd
      address
      education
      income
      job
      marriage
      purpose
    }
  }
`
