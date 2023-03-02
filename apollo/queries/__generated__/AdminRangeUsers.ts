/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RangeUsersFilter, COLLABORATOR_STATUS, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminRangeUsers
// ====================================================

export interface AdminRangeUsers_adminRangeUsers_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
}

export interface AdminRangeUsers_adminRangeUsers_info {
  __typename: "Info";
  id: string;
  cccd: string;
  name: string;
}

export interface AdminRangeUsers_adminRangeUsers_loan {
  __typename: "Loan";
  id: string;
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Thời Gian Vay
   */
  months: number;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
  /**
   * Số Tiền Vay
   */
  amount: number;
}

export interface AdminRangeUsers_adminRangeUsers {
  __typename: "User";
  id: string;
  createdAt: number;
  collaborator: AdminRangeUsers_adminRangeUsers_collaborator | null;
  email: string;
  info: AdminRangeUsers_adminRangeUsers_info | null;
  loan: AdminRangeUsers_adminRangeUsers_loan | null;
}

export interface AdminRangeUsers {
  adminRangeUsers: AdminRangeUsers_adminRangeUsers[];
}

export interface AdminRangeUsersVariables {
  filter: RangeUsersFilter;
}
