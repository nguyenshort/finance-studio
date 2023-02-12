/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCollaboratorFilter, COLLABORATOR_STATUS, LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetCollaborator
// ====================================================

export interface GetCollaborator_collaborator_clients_loan {
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

export interface GetCollaborator_collaborator_clients {
  __typename: "User";
  id: string;
  name: string;
  email: string | null;
  balance: number;
  loan: GetCollaborator_collaborator_clients_loan | null;
  createdAt: number;
}

export interface GetCollaborator_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
  clients: GetCollaborator_collaborator_clients[];
  fanpage: string;
}

export interface GetCollaborator {
  collaborator: GetCollaborator_collaborator;
}

export interface GetCollaboratorVariables {
  filter: GetCollaboratorFilter;
}
