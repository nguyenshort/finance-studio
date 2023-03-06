/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminRemoveUserInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminRemoveUser
// ====================================================

export interface AdminRemoveUser_adminRemoveUser {
  __typename: "User";
  id: string;
}

export interface AdminRemoveUser {
  adminRemoveUser: AdminRemoveUser_adminRemoveUser;
}

export interface AdminRemoveUserVariables {
  input: AdminRemoveUserInput;
}
