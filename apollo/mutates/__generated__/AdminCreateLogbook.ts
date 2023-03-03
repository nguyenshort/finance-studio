/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLogbookInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminCreateLogbook
// ====================================================

export interface AdminCreateLogbook_adminCreateLogbook {
  __typename: "Logbook";
  id: string;
  amount: number;
  note: string | null;
  createdAt: number;
}

export interface AdminCreateLogbook {
  adminCreateLogbook: AdminCreateLogbook_adminCreateLogbook;
}

export interface AdminCreateLogbookVariables {
  input: CreateLogbookInput;
}
