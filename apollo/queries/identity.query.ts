import { gql } from '#imports'

export const GET_ID = gql`
  query AdminIdentity($filter: AdminGetBankFilter!) {
    adminIdentity(filter: $filter) {
      id
      avatar
      back
      front
    }
  }
`
