/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Loan
// ====================================================

export interface Loan_loan {
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
}

export interface Loan {
  loan: Loan_loan | null;
}
