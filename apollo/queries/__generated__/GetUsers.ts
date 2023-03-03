/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_info {
  __typename: "Info";
  id: string;
  name: string;
  cccd: string;
}

export interface GetUsers_users_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
}

export interface GetUsers_users {
  __typename: "User";
  id: string;
  email: string;
  balance: number;
  createdAt: number;
  info: GetUsers_users_info | null;
  collaborator: GetUsers_users_collaborator | null;
}

export interface GetUsers {
  users: GetUsers_users[];
}
