/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBankInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateBank
// ====================================================

export interface AdminUpdateBank_adminUpdateBank {
  __typename: "Bank";
  id: string;
  name: string;
  bank: string;
  account: string;
}

export interface AdminUpdateBank {
  adminUpdateBank: AdminUpdateBank_adminUpdateBank;
}

export interface AdminUpdateBankVariables {
  input: UpdateBankInput;
}
