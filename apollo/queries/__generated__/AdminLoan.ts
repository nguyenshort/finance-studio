/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetLoanFilter, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminLoan
// ====================================================

export interface AdminLoan_adminLoan_user_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  fanpage: string;
}

export interface AdminLoan_adminLoan_user {
  __typename: "User";
  id: string;
  collaborator: AdminLoan_adminLoan_user_collaborator | null;
}

export interface AdminLoan_adminLoan {
  __typename: "Loan";
  id: string;
  /**
   * Số Tiền Vay
   */
  amount: number;
  createdAt: number;
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
  user: AdminLoan_adminLoan_user;
  updatedAt: number;
}

export interface AdminLoan {
  adminLoan: AdminLoan_adminLoan | null;
}

export interface AdminLoanVariables {
  filter: GetLoanFilter;
}
