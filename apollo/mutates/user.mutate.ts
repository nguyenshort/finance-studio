import { gql } from '#imports'

export const CHANGE_COLLABORATOR = gql`
  mutation AdminUpdateUserCollaborator($input: AdminUpdateUserInput!) {
    adminUpdateUser(input: $input) {
      id
      collaborator {
        id
        name
        status
      }
    }
  }
`

export const UPDATE_BANK = gql`
  mutation AdminUpdateBank($input: UpdateBankInput!) {
    adminUpdateBank(input: $input) {
      id
      name
      bank
      account
    }
  }
`


export const DELETE_LOGBOOK = gql`
  mutation AdminDeleteLogbook($input: DeleteLogbookInput!) {
    adminDeleteLogbook(input: $input) {
      id
    }
  }
`

export const CREATE_LOGBOOK = gql`
  mutation AdminCreateLogbook($input: CreateLogbookInput!) {
    adminCreateLogbook(input: $input) {
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

export const UPDATE_LOGBOOK = gql`
  mutation AdminUpdateLogbook($input: UpdateLogbookInput!) {
    adminUpdateLogbook(input: $input) {
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

export const CHANGE_BALANCE = gql`
  mutation AdminUpdateUserBalance($input: AdminUpdateUserInput!) {
    adminUpdateUser(input: $input) {
      id
      balance
    }
  }
`