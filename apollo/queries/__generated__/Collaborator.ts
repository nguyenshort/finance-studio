/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCollaboratorFilter, COLLABORATOR_STATUS, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: Collaborator
// ====================================================

export interface Collaborator_collaborator_clients {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  balance: number;
  createdAt: number;
}

export interface Collaborator_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
  clients: Collaborator_collaborator_clients[];
  fanpage: string;
}

export interface Collaborator_loan {
  __typename: "Loan";
  id: string;
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Số Tiền Vay
   */
  amount: number;
  /**
   * Thời Gian Vay
   */
  months: number;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
}

export interface Collaborator {
  collaborator: Collaborator_collaborator;
  loan: Collaborator_loan | null;
}

export interface CollaboratorVariables {
  filter: GetCollaboratorFilter;
}
