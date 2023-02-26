/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminUserBalance
// ====================================================

export interface AdminUserBalance_adminUser {
  __typename: "User";
  id: string;
  balance: number;
}

export interface AdminUserBalance {
  adminUser: AdminUserBalance_adminUser;
}

export interface AdminUserBalanceVariables {
  filter: GetUserFilter;
}
