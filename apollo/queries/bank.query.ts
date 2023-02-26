import { gql } from '#imports'
export const ADMIN_BANK = gql`
  query AdminBank($filter: GetBankFilter!) {
    adminBank(filter: $filter) {
      id
      name
      bank
      account
    }
  }
`