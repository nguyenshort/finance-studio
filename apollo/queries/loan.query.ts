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
    query FormCollaborators {
        collaborators {
            id
            name
            fanpage
            status
        }
    }
`

export const GET_LOANS = gql`
    query AdminLoans {
        adminLoans {
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
            note
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
            note
            createdAt
        }
    }
`
