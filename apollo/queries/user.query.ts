export const GET_USERS = gql`
    query GetUsers($filter: GetUsersFilter!) {
        users(filter: $filter) {
            id
            name
            email
            role
            balance
        }
    }
`

export const GET_USER = gql`
    query AdminUser($filter: GetUserFilter!) {
        adminUser(filter: $filter) {
            id
        }
    }
`

export const GET_CONTRACT = gql`
    query AdminUserContract($filter: GetUserFilter!) {
        adminUser(filter: $filter) {
            id
            info {
                id
                name
                born
                cccd
                address
                education
                income
                job
                marriage
                purpose
            }
            loan {
                id
                amount
                months
                interest
                signature
                status
            }
            collaborator {
                id
                name
                fanpage
            }
        }
    }
`
