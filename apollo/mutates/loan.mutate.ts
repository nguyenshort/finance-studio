import { gql } from '#imports'

export const UPDATE_LOAN = gql`
  mutation AdminUpdateLoan($input: UpdateLoanInput!) {
    adminUpdateLoan(input: $input) {
      id
      amount
      interest
      months
    }
  }
`

export const UPDATE_WITHDRAW = gql`
  mutation AdminUpdateWithdraw($input: UpdateWithdrawInput!) {
    adminUpdateWithdraw(input: $input) {
      id
      amount
      content
      status
      note
    }
  }
`