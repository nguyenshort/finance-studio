/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminUpdateUserInput, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateUser
// ====================================================

export interface AdminUpdateUser_adminUpdateUser_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
}

export interface AdminUpdateUser_adminUpdateUser {
  __typename: "User";
  id: string;
  collaborator: AdminUpdateUser_adminUpdateUser_collaborator | null;
}

export interface AdminUpdateUser {
  adminUpdateUser: AdminUpdateUser_adminUpdateUser;
}

export interface AdminUpdateUserVariables {
  input: AdminUpdateUserInput;
}
