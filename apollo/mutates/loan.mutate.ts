import { gql } from '#imports'

export const CREATE_LOAN = gql`
  mutation CreateLoan($input: CreateLoanInput!) {
    createLoan(input: $input) {
      id
      amount
      interest
      months
    }
  }
`

export const SIGN_LOAN = gql`
  mutation SignLoan($input: SignLoanInput!) {
    signLoan(input: $input) {
      id
      signature
    }
  }
`
