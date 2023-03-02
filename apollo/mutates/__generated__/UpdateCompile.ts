/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateInfoInput, UpdateLoanInput, AdminUpdateUserInput, UpdateBankInput, LoanStatus, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateCompile
// ====================================================

export interface UpdateCompile_adminUpdateInfo {
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

export interface UpdateCompile_adminUpdateLoan {
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

export interface UpdateCompile_adminUpdateUser_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
}

export interface UpdateCompile_adminUpdateUser {
  __typename: "User";
  id: string;
  collaborator: UpdateCompile_adminUpdateUser_collaborator | null;
  balance: number;
}

export interface UpdateCompile_adminUpdateBank {
  __typename: "Bank";
  id: string;
  name: string;
  bank: string;
  account: string;
}

export interface UpdateCompile {
  adminUpdateInfo: UpdateCompile_adminUpdateInfo;
  adminUpdateLoan: UpdateCompile_adminUpdateLoan;
  adminUpdateUser: UpdateCompile_adminUpdateUser;
  adminUpdateBank: UpdateCompile_adminUpdateBank;
}

export interface UpdateCompileVariables {
  input: UpdateInfoInput;
  input1: UpdateLoanInput;
  input2: AdminUpdateUserInput;
  input3: UpdateBankInput;
}
