/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminGetBankFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminIdentity
// ====================================================

export interface AdminIdentity_adminIdentity {
  __typename: "Identity";
  id: string;
  avatar: string;
  back: string;
  front: string;
}

export interface AdminIdentity {
  adminIdentity: AdminIdentity_adminIdentity | null;
}

export interface AdminIdentityVariables {
  filter: AdminGetBankFilter;
}
