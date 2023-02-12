/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBankInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateBank
// ====================================================

export interface UpdateBank_updateBank {
  __typename: "Bank";
  id: string;
  account: string;
  name: string;
  bank: string;
}

export interface UpdateBank {
  updateBank: UpdateBank_updateBank;
}

export interface UpdateBankVariables {
  input: UpdateBankInput;
}
