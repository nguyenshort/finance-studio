import { gql } from '#imports'

export const UPDATE_BANK = gql`
  ${BANK_DOC}
  mutation UpdateBank($input: UpdateBankInput!) {
    updateBank(input: $input) {
      ...BankDoc
    }
  }
`
