import { gql } from '#imports'

export const INFO_DOC = gql`
  fragment InfoDoc on Info {
    id
    name
  }
`

export const GET_INFO = gql`
  query AdminInfo($filter: GetInfoFilter!) {
    adminInfo(filter: $filter) {
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
