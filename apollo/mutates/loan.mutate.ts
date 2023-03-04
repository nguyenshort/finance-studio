import { gql } from '#imports'

export const UPDATE_LOAN = gql`
  mutation AdminUpdateLoan($input: UpdateLoanInput!) {
    adminUpdateLoan(input: $input) {
      id
      amount
      interest
      months
      signature
      status
    }
  }
`