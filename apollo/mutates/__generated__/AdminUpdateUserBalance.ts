/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminUpdateUserInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateUserBalance
// ====================================================

export interface AdminUpdateUserBalance_adminUpdateUser {
  __typename: "User";
  id: string;
  balance: number;
}

export interface AdminUpdateUserBalance {
  adminUpdateUser: AdminUpdateUserBalance_adminUpdateUser;
}

export interface AdminUpdateUserBalanceVariables {
  input: AdminUpdateUserInput;
}
