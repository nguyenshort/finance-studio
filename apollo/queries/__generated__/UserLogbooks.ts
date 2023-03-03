/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminGetLogbooksFilter, LOGBOOK_STATUS, LOGBOOK_TYPE } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: UserLogbooks
// ====================================================

export interface UserLogbooks_adminLogbooks {
  __typename: "Logbook";
  id: string;
  amount: number;
  note: string | null;
  /**
   * Nhóm trạng thái
   */
  status: LOGBOOK_STATUS;
  /**
   * Nhóm cong tru
   */
  type: LOGBOOK_TYPE;
  createdAt: number;
}

export interface UserLogbooks {
  adminLogbooks: UserLogbooks_adminLogbooks[];
}

export interface UserLogbooksVariables {
  filter: AdminGetLogbooksFilter;
}
