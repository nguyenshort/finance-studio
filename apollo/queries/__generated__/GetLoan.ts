/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetLoan
// ====================================================

export interface GetLoan_loan {
  __typename: "Loan";
  id: string;
  /**
   * Số Tiền Vay
   */
  amount: number;
  /**
   * Thời Gian Vay
   */
  months: number;
  /**
   * Lãi xuất
   */
  interest: number;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
  /**
   * Image chữ ký
   */
  signature: string;
}

export interface GetLoan {
  loan: GetLoan_loan | null;
}
