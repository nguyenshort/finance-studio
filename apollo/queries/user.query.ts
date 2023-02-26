export const GET_USERS = gql`
    query GetUsers($filter: GetUsersFilter!) {
        users(filter: $filter) {
            id
            email
            balance
            createdAt
            info {
                id
                name
                cccd
            }
            collaborator {
                id
                name
            }
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

export const GET_USER_BALANCE = gql`
    query AdminUserBalance($filter: GetUserFilter!) {
        adminUser(filter: $filter) {
            id
            balance
        }
    }
`

export const RANGE_USERS = gql`
    query AdminRangeUsers($filter: RangeUsersFilter!) {
        adminRangeUsers(filter: $filter) {
            id
            createdAt
            collaborator {
                id
                name
                status
            }
            email
            info {
                id
                cccd
                name
            }
            loan {
                id
                signature
                months
                status
                amount
            }
        }
    }
`
