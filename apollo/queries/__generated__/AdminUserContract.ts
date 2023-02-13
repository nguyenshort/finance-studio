/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserFilter, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminUserContract
// ====================================================

export interface AdminUserContract_adminUser_info {
  __typename: "Info";
  id: string;
  name: string;
  born: number[];
  cccd: string;
  address: string;
  education: string;
  income: string;
  job: string;
  marriage: string;
  purpose: string;
}

export interface AdminUserContract_adminUser_loan {
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
   * Image chữ ký
   */
  signature: string;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
}

export interface AdminUserContract_adminUser_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  fanpage: string;
}

export interface AdminUserContract_adminUser {
  __typename: "User";
  id: string;
  info: AdminUserContract_adminUser_info | null;
  loan: AdminUserContract_adminUser_loan | null;
  collaborator: AdminUserContract_adminUser_collaborator | null;
}

export interface AdminUserContract {
  adminUser: AdminUserContract_adminUser;
}

export interface AdminUserContractVariables {
  filter: GetUserFilter;
}
