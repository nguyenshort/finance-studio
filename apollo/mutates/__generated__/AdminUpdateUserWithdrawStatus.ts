/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminUpdateUserInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateUserWithdrawStatus
// ====================================================

export interface AdminUpdateUserWithdrawStatus_adminUpdateUser {
  __typename: "User";
  id: string;
  withdrawable: boolean;
  withdrawNote: string | null;
}

export interface AdminUpdateUserWithdrawStatus {
  adminUpdateUser: AdminUpdateUserWithdrawStatus_adminUpdateUser;
}

export interface AdminUpdateUserWithdrawStatusVariables {
  input: AdminUpdateUserInput;
}
