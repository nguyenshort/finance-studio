/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetLoanFilter, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminLoanStatus
// ====================================================

export interface AdminLoanStatus_adminLoan {
  __typename: "Loan";
  id: string;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
}

export interface AdminLoanStatus {
  adminLoan: AdminLoanStatus_adminLoan | null;
}

export interface AdminLoanStatusVariables {
  filter: GetLoanFilter;
}
