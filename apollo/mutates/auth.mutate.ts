import { gql } from '#imports'

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input)
    }
`


export const SIGN_IN = gql`
    mutation SignIn($input: SignInInput!) {
        signIn(input: $input)
    }
`