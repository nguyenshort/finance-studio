/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminUserWithdrawStatus
// ====================================================

export interface AdminUserWithdrawStatus_adminUser {
  __typename: "User";
  id: string;
  withdrawable: boolean;
  withdrawNote: string | null;
}

export interface AdminUserWithdrawStatus {
  adminUser: AdminUserWithdrawStatus_adminUser;
}

export interface AdminUserWithdrawStatusVariables {
  filter: GetUserFilter;
}
