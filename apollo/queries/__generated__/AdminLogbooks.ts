/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminGetLogbooksFilter, LOGBOOK_STATUS, LOGBOOK_TYPE } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminLogbooks
// ====================================================

export interface AdminLogbooks_adminLogbooks_user_info {
  __typename: "Info";
  name: string;
  cccd: string;
}

export interface AdminLogbooks_adminLogbooks_user_bank {
  __typename: "Bank";
  id: string;
  name: string;
  bank: string;
  account: string;
}

export interface AdminLogbooks_adminLogbooks_user_collaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
}

export interface AdminLogbooks_adminLogbooks_user {
  __typename: "User";
  id: string;
  info: AdminLogbooks_adminLogbooks_user_info | null;
  bank: AdminLogbooks_adminLogbooks_user_bank | null;
  collaborator: AdminLogbooks_adminLogbooks_user_collaborator | null;
}

export interface AdminLogbooks_adminLogbooks {
  __typename: "Logbook";
  id: string;
  createdAt: number;
  amount: number;
  /**
   * Nhóm trạng thái
   */
  status: LOGBOOK_STATUS;
  note: string | null;
  /**
   * Nhóm cong tru
   */
  type: LOGBOOK_TYPE;
  user: AdminLogbooks_adminLogbooks_user;
}

export interface AdminLogbooks {
  adminLogbooks: AdminLogbooks_adminLogbooks[];
}

export interface AdminLogbooksVariables {
  filter: AdminGetLogbooksFilter;
}
