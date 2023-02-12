/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUsersFilter, UserRole } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  balance: number;
}

export interface GetUsers {
  users: GetUsers_users[];
}

export interface GetUsersVariables {
  filter: GetUsersFilter;
}
