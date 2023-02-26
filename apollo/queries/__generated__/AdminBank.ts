/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetBankFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminBank
// ====================================================

export interface AdminBank_adminBank {
  __typename: "Bank";
  id: string;
  name: string;
  bank: string;
  account: string;
}

export interface AdminBank {
  adminBank: AdminBank_adminBank | null;
}

export interface AdminBankVariables {
  filter: GetBankFilter;
}
