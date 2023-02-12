export const VERIFIED_DATA = gql`
    ${IDENTITY_DOC}
    ${BANK_DOC}
    ${INFO_DOC}
    query VerifiedData {
        bank {
            ...BankDoc
        }
        info {
            ...InfoDoc
        }
        identity {
            ...IdentityDoc
        }
    }
`

export const GET_LOAN = gql`
    query GetLoan {
        loan {
            id
            amount
            months
            interest
            status
            signature
        }
    }
`
