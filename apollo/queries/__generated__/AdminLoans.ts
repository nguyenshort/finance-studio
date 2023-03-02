/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetLoansFilter, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminLoans
// ====================================================

export interface AdminLoans_adminLoans_user_info {
  __typename: "Info";
  id: string;
  name: string;
}

export interface AdminLoans_adminLoans_user {
  __typename: "User";
  id: string;
  email: string;
  info: AdminLoans_adminLoans_user_info | null;
}

export interface AdminLoans_adminLoans {
  __typename: "Loan";
  id: string;
  /**
   * Thời Gian Vay
   */
  months: number;
  user: AdminLoans_adminLoans_user;
  /**
   * Lãi xuất
   */
  interest: number;
  /**
   * Số Tiền Vay
   */
  amount: number;
  createdAt: number;
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
  updatedAt: number;
}

export interface AdminLoans {
  adminLoans: AdminLoans_adminLoans[];
}

export interface AdminLoansVariables {
  filter: GetLoansFilter;
}
