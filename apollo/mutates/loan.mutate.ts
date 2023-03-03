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

export const UPDATE_WITHDRAW = gql`
  mutation AdminUpdateWithdraw($input: UpdateWithdrawInput!) {
    adminUpdateWithdraw(input: $input) {
      id
      amount
      note
    }
  }
`