/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLoanInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateLoan
// ====================================================

export interface CreateLoan_createLoan {
  __typename: "Loan";
  id: string;
  /**
   * Số Tiền Vay
   */
  amount: number;
  /**
   * Lãi xuất
   */
  interest: number;
  /**
   * Thời Gian Vay
   */
  months: number;
}

export interface CreateLoan {
  createLoan: CreateLoan_createLoan;
}

export interface CreateLoanVariables {
  input: CreateLoanInput;
}
