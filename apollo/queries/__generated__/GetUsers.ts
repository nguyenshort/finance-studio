/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersFilter, UserRole } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
}

export interface GetUsers_users {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  balance: number;
  collaborator: GetUsers_users_collaborator | null;
}

export interface GetUsers {
  users: GetUsers_users[];
}

export interface GetUsersVariables {
  filter: GetUsersFilter;
}
