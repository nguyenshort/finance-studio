/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminUser
// ====================================================

export interface AdminUser_adminUser {
  __typename: "User";
  id: string;
}

export interface AdminUser {
  adminUser: AdminUser_adminUser;
}

export interface AdminUserVariables {
  filter: GetUserFilter;
}
