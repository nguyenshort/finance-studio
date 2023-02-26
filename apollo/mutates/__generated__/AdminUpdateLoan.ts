/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateLoanInput, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateLoan
// ====================================================

export interface AdminUpdateLoan_adminUpdateLoan {
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
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
}

export interface AdminUpdateLoan {
  adminUpdateLoan: AdminUpdateLoan_adminUpdateLoan;
}

export interface AdminUpdateLoanVariables {
  input: UpdateLoanInput;
}
