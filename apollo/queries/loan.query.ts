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

export const GET_LOAN_STATUS = gql`
    query AdminLoanStatus($filter: GetLoanFilter!) {
        adminLoan(filter: $filter) {
            id
            status
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

export const GET_LOGBOOKS = gql`
    query AdminLogbooks($filter: AdminGetLogbooksFilter!) {
        adminLogbooks(filter: $filter) {
            id
            createdAt
            amount
            content
            group
            status
            note
            type
            user {
                id
                info {
                    name
                    cccd
                }
                bank {
                    id
                    name
                    bank
                    account
                }
                collaborator {
                    id
                    name
                }
            }
        }
    }
`

export const ADMIN_LOGBOOKS = gql`
    query UserLogbooks($filter: AdminGetLogbooksFilter!) {
        adminLogbooks(filter: $filter) {
            id
            amount
            content
            note
            group
            status
            type
            createdAt
        }
    }
`
