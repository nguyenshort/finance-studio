/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWithdrawInput, LOGBOOK_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateWithdraw
// ====================================================

export interface AdminUpdateWithdraw_adminUpdateWithdraw {
  __typename: "Logbook";
  id: string;
  amount: number;
  /**
   * Nhóm trạng thái
   */
  status: LOGBOOK_STATUS;
  note: string | null;
}

export interface AdminUpdateWithdraw {
  /**
   * Cannot effect to user balance
   */
  adminUpdateWithdraw: AdminUpdateWithdraw_adminUpdateWithdraw;
}

export interface AdminUpdateWithdrawVariables {
  input: UpdateWithdrawInput;
}
