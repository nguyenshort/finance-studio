/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteLogbookInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminDeleteLogbook
// ====================================================

export interface AdminDeleteLogbook_adminDeleteLogbook {
  __typename: "Logbook";
  id: string;
}

export interface AdminDeleteLogbook {
  adminDeleteLogbook: AdminDeleteLogbook_adminDeleteLogbook;
}

export interface AdminDeleteLogbookVariables {
  input: DeleteLogbookInput;
}
