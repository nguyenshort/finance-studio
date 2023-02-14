/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminUpdateUserInput, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateUserCollaborator
// ====================================================

export interface AdminUpdateUserCollaborator_adminUpdateUser_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
}

export interface AdminUpdateUserCollaborator_adminUpdateUser {
  __typename: "User";
  id: string;
  collaborator: AdminUpdateUserCollaborator_adminUpdateUser_collaborator | null;
}

export interface AdminUpdateUserCollaborator {
  adminUpdateUser: AdminUpdateUserCollaborator_adminUpdateUser;
}

export interface AdminUpdateUserCollaboratorVariables {
  input: AdminUpdateUserInput;
}
