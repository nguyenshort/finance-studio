/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignLoanInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: SignLoan
// ====================================================

export interface SignLoan_signLoan {
  __typename: "Loan";
  id: string;
  /**
   * Image chữ ký
   */
  signature: string;
}

export interface SignLoan {
  signLoan: SignLoan_signLoan;
}

export interface SignLoanVariables {
  input: SignLoanInput;
}
