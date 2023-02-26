/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateLogbookInput, LOGBOOK_GROUP, LOGBOOK_STATUS, LOGBOOK_TYPE } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateLogbook
// ====================================================

export interface AdminUpdateLogbook_adminUpdateLogbook {
  __typename: "Logbook";
  id: string;
  amount: number;
  content: string | null;
  note: string | null;
  /**
   * Nhóm trạng thái
   */
  group: LOGBOOK_GROUP;
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

export interface AdminUpdateLogbook {
  adminUpdateLogbook: AdminUpdateLogbook_adminUpdateLogbook;
}

export interface AdminUpdateLogbookVariables {
  input: UpdateLogbookInput;
}
