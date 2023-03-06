/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePasswordUserInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdatePassword
// ====================================================

export interface AdminUpdatePassword_adminUpdatePassword {
  __typename: "User";
  id: string;
}

export interface AdminUpdatePassword {
  adminUpdatePassword: AdminUpdatePassword_adminUpdatePassword;
}

export interface AdminUpdatePasswordVariables {
  input: UpdatePasswordUserInput;
}
