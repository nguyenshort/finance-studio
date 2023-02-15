export const GET_LOAN = gql`
    query AdminLoan($filter: GetLoanFilter!) {
        adminLoan(filter: $filter) {
            id
            amount
            createdAt
            interest
            months
            signature
            status
            user {
                id
                collaborator {
                    id
                    name
                    fanpage
                }
            }
            updatedAt
        }
    }
`

export const GET_COLLABORATORS_FOR_LOAN = gql`
    query FormCollaborators($filter: GetCollaboratorsFilter!) {
        collaborators(filter: $filter) {
            id
            name
            fanpage
            status
        }
    }
`

export const GET_LOANS = gql`
    query AdminLoans($filter: GetLoansFilter!) {
        adminLoans(filter: $filter) {
            id
            months
            user {
                id
                email
                info {
                    id
                    name
                }
            }
            interest
            amount
            createdAt
            signature
            status
            updatedAt
        }
    }
`
