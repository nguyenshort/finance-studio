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
