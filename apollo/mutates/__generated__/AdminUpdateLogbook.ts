/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateLogbookInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateLogbook
// ====================================================

export interface AdminUpdateLogbook_adminUpdateLogbook {
  __typename: "Logbook";
  id: string;
  amount: number;
  note: string | null;
  createdAt: number;
}

export interface AdminUpdateLogbook {
  adminUpdateLogbook: AdminUpdateLogbook_adminUpdateLogbook;
}

export interface AdminUpdateLogbookVariables {
  input: UpdateLogbookInput;
}
